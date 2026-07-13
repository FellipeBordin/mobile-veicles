import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

import { Radius } from "@/src/styles/radius";
import { Spacing } from "@/src/styles/spacing";
import { Theme } from "@/src/styles/theme";

type InputProps = TextInputProps & {
  label: string;
};

export function Input({ label, style, ...inputProps }: InputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        {...inputProps}
        placeholderTextColor={Theme.textMuted}
        style={[styles.input, style]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.xs,
  },

  label: {
    color: Theme.textPrimary,
    fontSize: 14,
    fontWeight: "700",
  },

  input: {
    backgroundColor: Theme.surfaceMuted,
    borderWidth: 1,
    borderColor: Theme.border,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    color: Theme.textPrimary,
    fontSize: 16,
  },
});
