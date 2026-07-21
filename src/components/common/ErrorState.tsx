import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { Button } from "./Button";

import { useAppTheme } from "@/src/contexts/ThemeContexte";
import { Radius } from "@/src/styles/radius";
import { Spacing } from "@/src/styles/spacing";
import { Typography } from "@/src/styles/typography";

type ErrorStateProps = {
  title?: string;
  message: string;
  buttonTitle?: string;
  onRetry?: () => void;
};

export function ErrorState({
  title = "Algo deu errado",
  message,
  buttonTitle,
  onRetry,
}: ErrorStateProps) {
  const { theme } = useAppTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: theme.dangerLight,
          },
        ]}
      >
        <MaterialIcons name="error-outline" size={42} color={theme.danger} />
      </View>

      <Text
        style={[
          styles.title,
          {
            color: theme.textPrimary,
          },
        ]}
      >
        {title}
      </Text>

      <Text
        style={[
          styles.message,
          {
            color: theme.textSecondary,
          },
        ]}
      >
        {message}
      </Text>

      {buttonTitle && onRetry && (
        <Button
          title={buttonTitle}
          icon="refresh"
          variant="secondary"
          onPress={onRetry}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: Spacing.xxl,
    gap: Spacing.md,
  },

  iconContainer: {
    width: 86,
    height: 86,
    borderRadius: Radius.full,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    ...Typography.sectionTitle,
  },

  message: {
    ...Typography.body,
    textAlign: "center",
    maxWidth: 300,
  },
});
