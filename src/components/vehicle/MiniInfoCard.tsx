import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/src/contexts/ThemeContexte";
import { Radius } from "@/src/styles/radius";
import { Spacing } from "@/src/styles/spacing";

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
  const { theme } = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: bg,
          borderColor: theme.border,
        },
      ]}
    >
      <View style={styles.iconContainer}>
        <MaterialIcons name={icon} size={21} color={iconColor} />
      </View>

      <Text
        style={[
          styles.value,
          {
            color: theme.textPrimary,
          },
        ]}
        numberOfLines={1}
      >
        {value}
      </Text>

      <Text
        style={[
          styles.label,
          {
            color: theme.textSecondary,
          },
        ]}
      >
        {label}
      </Text>
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
  },

  iconContainer: {
    marginBottom: Spacing.sm,
  },

  value: {
    fontSize: 16,
    fontWeight: "800",
  },

  label: {
    fontSize: 12,
    lineHeight: 16,
    marginTop: Spacing.xs,
  },
});
