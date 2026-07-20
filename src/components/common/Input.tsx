import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

import { useAppTheme } from "@/src/contexts/ThemeContexte";
import { Radius } from "@/src/styles/radius";
import { Spacing } from "@/src/styles/spacing";
import { Typography } from "@/src/styles/typography";

type InputProps = TextInputProps & {
  label: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  error?: string;
};

export function Input({
  label,
  icon,
  error,
  style,
  onFocus,
  onBlur,
  ...inputProps
}: InputProps) {
  const { theme } = useAppTheme();

  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.label,
          {
            color: theme.textPrimary,
          },
        ]}
      >
        {label}
      </Text>

      <View
        style={[
          styles.inputContainer,

          {
            backgroundColor: theme.surfaceMuted,
            borderColor: theme.border,
          },

          focused && {
            backgroundColor: theme.surface,
            borderColor: theme.accent,
          },

          error && {
            backgroundColor: theme.dangerLight,
            borderColor: theme.danger,
          },
        ]}
      >
        {icon && (
          <MaterialIcons
            name={icon}
            size={20}
            color={focused ? theme.accent : theme.textMuted}
          />
        )}

        <TextInput
          {...inputProps}
          style={[
            styles.input,
            {
              color: theme.textPrimary,
            },
            style,
          ]}
          placeholderTextColor={theme.textMuted}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
        />
      </View>

      {error && (
        <Text
          style={[
            styles.errorText,
            {
              color: theme.dangerDark,
            },
          ]}
        >
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.xs,
  },

  label: {
    ...Typography.bodyStrong,
  },

  inputContainer: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    borderWidth: 1,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
  },

  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: Spacing.md,
  },

  errorText: {
    ...Typography.caption,
  },
});
