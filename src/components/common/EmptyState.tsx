import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { Button } from "./Button";
import { Radius } from "@/src/styles/radius";
import { Spacing } from "@/src/styles/spacing";
import { Theme } from "@/src/styles/theme";

type EmptyStateProps = {
  title: string;
  message?: string;
  buttonTitle?: string;
  onPress?: () => void;
};

export function EmptyState({
  title,
  message,
  buttonTitle,
  onPress,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialIcons name="directions-car" size={28} color={Theme.accent} />
      </View>

      <Text style={styles.title}>{title}</Text>

      {message ? <Text style={styles.message}>{message}</Text> : null}

      {buttonTitle && onPress ? (
        <Button title={buttonTitle} onPress={onPress} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.surface,
    borderWidth: 1,
    borderColor: Theme.border,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    marginTop: Spacing.lg,
  },

  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: Radius.lg,
    backgroundColor: Theme.accentLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.md,
  },

  title: {
    color: Theme.textPrimary,
    fontSize: 17,
    fontWeight: "800",
    textAlign: "center",
  },

  message: {
    color: Theme.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
  },
});
