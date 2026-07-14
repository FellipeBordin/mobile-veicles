import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { formatBRL } from "@/src/utils/formatters";
import { getProfitStyle } from "@/src/utils/VehicleHelpers";

import { Radius } from "@/src/styles/radius";
import { Spacing } from "@/src/styles/spacing";
import { Theme } from "@/src/styles/theme";

type ProfitResultProps = {
  profit?: number | null;
};

export function ProfitResult({ profit }: ProfitResultProps) {
  const style = getProfitStyle(profit);

  const icon =
    profit == null ? "remove" : profit >= 0 ? "trending-up" : "trending-down";

  return (
    <View style={[styles.container, { backgroundColor: style.bg }]}>
      <View style={styles.header}>
        <MaterialIcons name={icon} size={20} color={style.color} />

        <Text style={styles.label}>Lucro / Prejuízo</Text>
      </View>

      <Text
        style={[
          styles.value,
          {
            color: style.color,
          },
        ]}
      >
        {profit != null ? formatBRL(profit) : "-"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Radius.lg,
    padding: Spacing.md,
    gap: Spacing.sm,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },

  label: {
    color: Theme.textSecondary,
    fontSize: 13,
    fontWeight: "700",
  },

  value: {
    fontSize: 24,
    fontWeight: "900",
  },
});
