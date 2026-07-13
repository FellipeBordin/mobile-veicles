import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { Card } from "../common/Card";
import { formatBRL } from "../../utils/formatters";
import { Radius } from "@/src/styles/radius";
import { Spacing } from "@/src/styles/spacing";
import { Theme } from "@/src/styles/theme";

type VehicleSummaryProps = {
  summary: {
    totalVehicles: number;
    inStockCount: number;
    soldCount: number;
    totalInvested: number;
    totalProfit: number;
  };
};

export function VehicleSummary({ summary }: VehicleSummaryProps) {
  const hasProfit = summary.totalProfit >= 0;

  return (
    <Card>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>VISÃO GERAL</Text>
          <Text style={styles.title}>Resumo da operação</Text>
        </View>

        <View style={styles.headerIcon}>
          <MaterialIcons name="analytics" size={22} color={Theme.accent} />
        </View>
      </View>

      <View style={styles.cardsRow}>
        <SummaryCard
          label="Veículos"
          value={String(summary.totalVehicles)}
          icon="directions-car"
          backgroundColor={Theme.accentLight}
          iconColor={Theme.accent}
        />

        <SummaryCard
          label="Em estoque"
          value={String(summary.inStockCount)}
          icon="inventory-2"
          backgroundColor={Theme.surfaceMuted}
          iconColor={Theme.textSecondary}
        />

        <SummaryCard
          label="Vendidos"
          value={String(summary.soldCount)}
          icon="task-alt"
          backgroundColor={Theme.successLight}
          iconColor={Theme.successDark}
        />
      </View>

      <View style={styles.financialSection}>
        <SummaryRow
          label="Total investido"
          value={formatBRL(summary.totalInvested)}
        />

        <View style={styles.divider} />

        <View
          style={[
            styles.resultCard,
            {
              backgroundColor: hasProfit
                ? Theme.successLight
                : Theme.dangerLight,
            },
          ]}
        >
          <View style={styles.resultLabelContainer}>
            <MaterialIcons
              name={hasProfit ? "trending-up" : "trending-down"}
              size={20}
              color={hasProfit ? Theme.successDark : Theme.dangerDark}
            />

            <Text style={styles.resultLabel}>Resultado acumulado</Text>
          </View>

          <Text
            style={[
              styles.resultValue,
              {
                color: hasProfit ? Theme.successDark : Theme.dangerDark,
              },
            ]}
          >
            {formatBRL(summary.totalProfit)}
          </Text>
        </View>
      </View>
    </Card>
  );
}

type SummaryCardProps = {
  label: string;
  value: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  backgroundColor: string;
  iconColor: string;
};

function SummaryCard({
  label,
  value,
  icon,
  backgroundColor,
  iconColor,
}: SummaryCardProps) {
  return (
    <View style={[styles.summaryCard, { backgroundColor }]}>
      <View style={styles.summaryIcon}>
        <MaterialIcons name={icon} size={21} color={iconColor} />
      </View>

      <Text style={styles.summaryValue}>{value}</Text>
      <Text style={styles.summaryLabel}>{label}</Text>
    </View>
  );
}

type SummaryRowProps = {
  label: string;
  value: string;
};

function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  eyebrow: {
    color: Theme.accent,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },

  title: {
    color: Theme.textPrimary,
    fontSize: 18,
    fontWeight: "800",
    marginTop: Spacing.xs,
  },

  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: Theme.accentLight,
    alignItems: "center",
    justifyContent: "center",
  },

  cardsRow: {
    flexDirection: "row",
    gap: Spacing.sm,
  },

  summaryCard: {
    flex: 1,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    minHeight: 112,
  },

  summaryIcon: {
    marginBottom: Spacing.sm,
  },

  summaryValue: {
    color: Theme.textPrimary,
    fontSize: 22,
    fontWeight: "900",
  },

  summaryLabel: {
    color: Theme.textSecondary,
    fontSize: 12,
    lineHeight: 16,
    marginTop: Spacing.xs,
  },

  financialSection: {
    gap: Spacing.md,
  },

  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  rowLabel: {
    color: Theme.textSecondary,
    fontSize: 14,
  },

  rowValue: {
    color: Theme.textPrimary,
    fontSize: 15,
    fontWeight: "800",
  },

  divider: {
    height: 1,
    backgroundColor: Theme.border,
  },

  resultCard: {
    borderRadius: Radius.lg,
    padding: Spacing.md,
    gap: Spacing.sm,
  },

  resultLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },

  resultLabel: {
    color: Theme.textSecondary,
    fontSize: 13,
    fontWeight: "700",
  },

  resultValue: {
    fontSize: 22,
    fontWeight: "900",
  },
});
