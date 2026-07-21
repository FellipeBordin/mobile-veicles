import { StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/src/contexts/ThemeContexte";
import { Radius } from "@/src/styles/radius";
import { Spacing } from "@/src/styles/spacing";

type InfoRow = {
  label: string;
  value: string;
};

type InfoBlockProps = {
  title: string;
  rows: InfoRow[];
};

export function InfoBlock({ title, rows }: InfoBlockProps) {
  const { theme } = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.surfaceMuted,
          borderColor: theme.border,
        },
      ]}
    >
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

      {rows.map((row, index) => (
        <View key={row.label}>
          <View style={styles.row}>
            <Text
              style={[
                styles.label,
                {
                  color: theme.textSecondary,
                },
              ]}
            >
              {row.label}
            </Text>

            <Text
              style={[
                styles.value,
                {
                  color: theme.textPrimary,
                },
              ]}
            >
              {row.value}
            </Text>
          </View>

          {index < rows.length - 1 && (
            <View
              style={[
                styles.divider,
                {
                  backgroundColor: theme.border,
                },
              ]}
            />
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Radius.xl,
    borderWidth: 1,
    padding: Spacing.md,
    gap: Spacing.sm,
  },

  title: {
    fontSize: 17,
    fontWeight: "800",
    marginBottom: Spacing.xs,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: Spacing.md,
    paddingVertical: Spacing.sm,
  },

  label: {
    flex: 1,
    fontSize: 14,
  },

  value: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    textAlign: "right",
  },

  divider: {
    height: 1,
  },
});
