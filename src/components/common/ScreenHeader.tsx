import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/src/contexts/ThemeContexte";
import { Radius } from "@/src/styles/radius";
import { Spacing } from "@/src/styles/spacing";
import { Typography } from "@/src/styles/typography";

type ScreenHeaderProps = {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  subtitle: string;
};

export function ScreenHeader({
  icon,
  title,
  subtitle,
}: ScreenHeaderProps) {
  const { theme } = useAppTheme();

  return (
    <View style={styles.header}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: theme.accentLight,
          },
        ]}
      >
        <MaterialIcons
          name={icon}
          size={28}
          color={theme.accent}
        />
      </View>

      <View style={styles.headerText}>
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
            styles.subtitle,
            {
              color: theme.textSecondary,
            },
          ]}
        >
          {subtitle}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },

  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: Radius.lg,
    alignItems: "center",
    justifyContent: "center",
  },

  headerText: {
    flex: 1,
  },

  title: {
    ...Typography.cardTitle,
  },

  subtitle: {
    ...Typography.body,
    marginTop: Spacing.xs,
  },
});