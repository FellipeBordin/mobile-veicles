import { StyleSheet, Text, View } from "react-native";

import { Radius } from "@/src/styles/radius";
import { Spacing } from "@/src/styles/spacing";
import { Theme } from "@/src/styles/theme";

type InfoRow = {
  label: string;
  value: string;
};

type InfoBlockProps = {
  title: string;
  rows: InfoRow[];
};

export function InfoBlock({ title, rows }: InfoBlockProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {rows.map((row, index) => (
        <View key={row.label}>
          <View style={styles.row}>
            <Text style={styles.label}>{row.label}</Text>

            <Text style={styles.value}>{row.value}</Text>
          </View>

          {index < rows.length - 1 && <View style={styles.divider} />}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.surfaceMuted,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Theme.border,
    padding: Spacing.md,
    gap: Spacing.sm,
  },

  title: {
    color: Theme.textPrimary,
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
    color: Theme.textSecondary,
    fontSize: 14,
  },

  value: {
    flex: 1,
    color: Theme.textPrimary,
    fontSize: 14,
    fontWeight: "700",
    textAlign: "right",
  },

  divider: {
    height: 1,
    backgroundColor: Theme.border,
  },
});
