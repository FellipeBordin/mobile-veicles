import { MaterialIcons } from "@expo/vector-icons";
import { useMemo } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useAppTheme } from "@/src/contexts/ThemeContexte";
import { Radius } from "@/src/styles/radius";
import { Spacing } from "@/src/styles/spacing";
import type { AppTheme } from "@/src/styles/theme";
import { Typography } from "@/src/styles/typography";

type ButtonVariant =
  | "primary"
  | "success"
  | "danger"
  | "secondary"
  | "ghost";

type ButtonProps = {
  title: string;
  loadingTitle?: string;
  loading?: boolean;
  disabled?: boolean;
  onPress: () => void;
  variant?: ButtonVariant;
  icon?: keyof typeof MaterialIcons.glyphMap;
};

type VariantColors = {
  background: string;
  text: string;
  border: string;
};

export function Button({
  title,
  loadingTitle,
  loading = false,
  disabled = false,
  onPress,
  variant = "primary",
  icon,
}: ButtonProps) {
  const { theme } = useAppTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);
  const variantColors = getVariantColors(theme);
  const colors = variantColors[variant];

  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{
        disabled: isDisabled,
        busy: loading,
      }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variant === "ghost" && styles.ghostButton,
        {
          backgroundColor: colors.background,
          borderColor: colors.border,
          opacity: isDisabled ? 0.55 : pressed ? 0.82 : 1,
          transform: [
            {
              scale: pressed && !isDisabled ? 0.98 : 1,
            },
          ],
        },
      ]}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="small" color={colors.text} />
        ) : icon ? (
          <MaterialIcons name={icon} size={18} color={colors.text} />
        ) : null}

        <Text style={[styles.text, { color: colors.text }]}>
          {loading ? loadingTitle ?? "Carregando..." : title}
        </Text>
      </View>
    </Pressable>
  );
}

function getVariantColors(
  theme: AppTheme,
): Record<ButtonVariant, VariantColors> {
  return {
    primary: {
      background: theme.primary,
      text: theme.textInverse,
      border: theme.primary,
    },

    success: {
      background: theme.success,
      text: theme.textInverse,
      border: theme.success,
    },

    danger: {
      background: theme.danger,
      text: theme.textInverse,
      border: theme.danger,
    },

    secondary: {
      background: theme.surface,
      text: theme.textPrimary,
      border: theme.border,
    },

    ghost: {
      background: "transparent",
      text: theme.textPrimary,
      border: "transparent",
    },
  };
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    button: {
      minHeight: 46,
      marginTop: Spacing.xs,
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.lg,
      borderRadius: Radius.lg,
      borderWidth: 1,
      alignItems: "center",
      justifyContent: "center",
    },

    ghostButton: {
      minHeight: 40,
      paddingVertical: Spacing.sm,
    },

    content: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: Spacing.sm,
    },

    text: {
      ...Typography.button,
      textAlign: "center",
    },
  });
}