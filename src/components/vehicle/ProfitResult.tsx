import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/src/contexts/ThemeContexte";
import { Radius } from "@/src/styles/radius";
import { Spacing } from "@/src/styles/spacing";
import { formatBRL } from "@/src/utils/formatters";
import { getProfitStyle } from "@/src/utils/VehicleHelpers";

type ProfitResultProps = {
  profit?: number | null;
};

export function ProfitResult({ profit }: ProfitResultProps) {
  const { theme } = useAppTheme();

  const profitStyle = getProfitStyle(profit, theme);

  const icon =
    profit == null ? "remove" : profit >= 0 ? "trending-up" : "trending-down";

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: profitStyle.bg,
        },
      ]}
    >
      <View style={styles.header}>
        <MaterialIcons name={icon} size={20} color={profitStyle.color} />

        <Text
          style={[
            styles.label,
            {
              color: theme.textSecondary,
            },
          ]}
        >
          Lucro / Prejuízo
        </Text>
      </View>

      <Text
        style={[
          styles.value,
          {
            color: profitStyle.color,
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
    fontSize: 13,
    fontWeight: "700",
  },

  value: {
    fontSize: 24,
    fontWeight: "900",
  },
});
