import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { Radius } from "@/src/styles/radius";
import { Spacing } from "@/src/styles/spacing";
import { Theme } from "@/src/styles/theme";

type MiniInfoCardProps = {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  value: string;
  bg: string;
  iconColor: string;
};

export function MiniInfoCard({
  icon,
  label,
  value,
  bg,
  iconColor,
}: MiniInfoCardProps) {
  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <View style={styles.iconContainer}>
        <MaterialIcons name={icon} size={21} color={iconColor} />
      </View>

      <Text style={styles.value} numberOfLines={1}>
        {value}
      </Text>

      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 112,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Theme.border,
  },

  iconContainer: {
    marginBottom: Spacing.sm,
  },

  value: {
    color: Theme.textPrimary,
    fontSize: 16,
    fontWeight: "800",
  },

  label: {
    color: Theme.textSecondary,
    fontSize: 12,
    lineHeight: 16,
    marginTop: Spacing.xs,
  },
});
