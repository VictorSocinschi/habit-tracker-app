import { AuthProvider, useAuth } from "@/lib/auth-context";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isLoadingUser } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    const isAuthRoute = segments[0] === "auth";
    if (!user && !isAuthRoute && !isLoadingUser) {
      router.replace("/auth");
    } else if (user && isAuthRoute) {
      router.replace("/");
    }
  }, [user, segments, router, isLoadingUser]);
  return <>{children}</>;
}
export default function RootLayout() {
  return (
    <AuthProvider>
      <RouteGuard>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </RouteGuard>
    </AuthProvider>
  );
}
