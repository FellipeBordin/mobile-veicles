import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { Button } from "./Button";

import { useAppTheme } from "@/src/contexts/ThemeContexte";
import { Radius } from "@/src/styles/radius";
import { Spacing } from "@/src/styles/spacing";
import { Typography } from "@/src/styles/typography";

type EmptyStateProps = {
  title: string;
  message: string;
  buttonTitle?: string;
  onPress?: () => void;
};

export function EmptyState({
  title,
  message,
  buttonTitle,
  onPress,
}: EmptyStateProps) {
  const { theme } = useAppTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: theme.accentLight,
          },
        ]}
      >
        <MaterialIcons name="directions-car" size={42} color={theme.accent} />
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

      {buttonTitle && onPress && (
        <Button
          title={buttonTitle}
          icon="add-circle-outline"
          onPress={onPress}
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
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    ...Typography.sectionTitle,
  },

  message: {
    maxWidth: 280,
    ...Typography.body,
    textAlign: "center",
  },
});
