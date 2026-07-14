import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { Radius } from "@/src/styles/radius";
import { Spacing } from "@/src/styles/spacing";
import { Theme } from "@/src/styles/theme";

type ScreenHeaderProps = {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  subtitle: string;
};

export function ScreenHeader({ icon, title, subtitle }: ScreenHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.iconContainer}>
        <MaterialIcons name={icon} size={28} color={Theme.accent} />
      </View>

      <View style={styles.headerText}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
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
    backgroundColor: Theme.accentLight,
    alignItems: "center",
    justifyContent: "center",
  },

  headerText: {
    flex: 1,
  },

  title: {
    color: Theme.textPrimary,
    fontSize: 24,
    fontWeight: "800",
  },

  subtitle: {
    color: Theme.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginTop: Spacing.xs,
  },
});
