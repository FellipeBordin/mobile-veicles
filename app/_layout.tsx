import { Stack, usePathname, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { ThemeProvider, useAppTheme } from "@/src/contexts/ThemeContexte";
import { getToken } from "@/src/lib/session";
import type { AppTheme } from "@/src/styles/theme";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthLayout />
    </ThemeProvider>
  );
}

function AuthLayout() {
  const router = useRouter();
  const pathname = usePathname();

  const { theme, isDark } = useAppTheme();

  const [loading, setLoading] = useState(true);

  const styles = createStyles(theme);

  useEffect(() => {
    let mounted = true;

    async function checkAuth() {
      try {
        const token = await getToken();
        const loggedIn = Boolean(token);

        if (!mounted) return;

        const isAuthPage =
          pathname === "/login" ||
          pathname === "/register" ||
          pathname === "/forgot-password";

        if (!loggedIn && !isAuthPage) {
          router.replace("/login");
          return;
        }

        if (loggedIn && isAuthPage) {
          router.replace("/");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    checkAuth();

    return () => {
      mounted = false;
    };
  }, [pathname, router]);

  if (loading) {
    return (
      <>
        <StatusBar style={isDark ? "light" : "dark"} />

        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color={theme.accent}
          />

          <Text style={styles.loadingText}>
            Carregando...
          </Text>
        </View>
      </>
    );
  }

  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.background,
          },
        }}
      >
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="forgot-password" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="new" />
        <Stack.Screen name="vehicles/[id]" />
        <Stack.Screen name="vehicles/[id]/expense" />
        <Stack.Screen name="vehicles/[id]/sell" />
        <Stack.Screen name="expenses/[id]/edit" />
      </Stack>
    </>
  );
}

function createStyles(theme: AppTheme | Record<string, string>) {
  return StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      gap: 12,
      backgroundColor: theme.background,
    },

    loadingText: {
      color: theme.textSecondary,
    },
  });
}