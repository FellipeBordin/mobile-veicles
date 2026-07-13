import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { Spacing } from "@/src/styles/spacing";
import { Theme } from "@/src/styles/theme";

type LoadingStateProps = {
  message?: string;
};

export function LoadingState({ message = "Carregando..." }: LoadingStateProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Theme.accent} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.md,
    paddingVertical: Spacing.xl,
  },

  message: {
    color: Theme.textSecondary,
    fontSize: 14,
    fontWeight: "600",
  },
});
