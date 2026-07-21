import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/src/contexts/ThemeContexte";
import { Spacing } from "@/src/styles/spacing";
import { Typography } from "@/src/styles/typography";

type LoadingStateProps = {
  message?: string;
  description?: string;
};

export function LoadingState({
  message = "Carregando...",
  description = "Aguarde alguns instantes.",
}: LoadingStateProps) {
  const { theme } = useAppTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.indicatorContainer,
          {
            backgroundColor: theme.accentLight,
          },
        ]}
      >
        <ActivityIndicator size="large" color={theme.accent} />
      </View>

      <Text
        style={[
          styles.message,
          {
            color: theme.textPrimary,
          },
        ]}
      >
        {message}
      </Text>

      <Text
        style={[
          styles.description,
          {
            color: theme.textSecondary,
          },
        ]}
      >
        {description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.xxl,
    gap: Spacing.md,
  },

  indicatorContainer: {
    width: 86,
    height: 86,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },

  message: {
    ...Typography.sectionTitle,
    textAlign: "center",
  },

  description: {
    maxWidth: 280,
    ...Typography.body,
    textAlign: "center",
  },
});
