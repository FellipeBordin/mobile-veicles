import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { Card } from "../common/Card";
import { useAppTheme } from "@/src/contexts/ThemeContexte";
import { formatBRL } from "../../utils/formatters";
import { Radius } from "@/src/styles/radius";
import { Spacing } from "@/src/styles/spacing";

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
  const { theme } = useAppTheme();

  const hasProfit = summary.totalProfit >= 0;

  return (
    <Card>
      <View style={styles.header}>
        <View>
          <Text
            style={[
              styles.eyebrow,
              {
                color: theme.accent,
              },
            ]}
          >
            VISÃO GERAL
          </Text>

          <Text
            style={[
              styles.title,
              {
                color: theme.textPrimary,
              },
            ]}
          >
            Resumo da operação
          </Text>
        </View>

        <View
          style={[
            styles.headerIcon,
            {
              backgroundColor: theme.accentLight,
            },
          ]}
        >
          <MaterialIcons name="analytics" size={22} color={theme.accent} />
        </View>
      </View>

      <View style={styles.cardsRow}>
        <SummaryCard
          label="Veículos"
          value={String(summary.totalVehicles)}
          icon="directions-car"
          backgroundColor={theme.accentLight}
          iconColor={theme.accent}
        />

        <SummaryCard
          label="Em estoque"
          value={String(summary.inStockCount)}
          icon="inventory-2"
          backgroundColor={theme.surfaceMuted}
          iconColor={theme.textSecondary}
        />

        <SummaryCard
          label="Vendidos"
          value={String(summary.soldCount)}
          icon="task-alt"
          backgroundColor={theme.successLight}
          iconColor={theme.successDark}
        />
      </View>

      <View style={styles.financialSection}>
        <SummaryRow
          label="Total investido"
          value={formatBRL(summary.totalInvested)}
        />

        <View
          style={[
            styles.divider,
            {
              backgroundColor: theme.border,
            },
          ]}
        />

        <View
          style={[
            styles.resultCard,
            {
              backgroundColor: hasProfit
                ? theme.successLight
                : theme.dangerLight,
            },
          ]}
        >
          <View style={styles.resultLabelContainer}>
            <MaterialIcons
              name={hasProfit ? "trending-up" : "trending-down"}
              size={20}
              color={hasProfit ? theme.successDark : theme.dangerDark}
            />

            <Text
              style={[
                styles.resultLabel,
                {
                  color: theme.textSecondary,
                },
              ]}
            >
              Resultado acumulado
            </Text>
          </View>

          <Text
            style={[
              styles.resultValue,
              {
                color: hasProfit ? theme.successDark : theme.dangerDark,
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
  const { theme } = useAppTheme();

  return (
    <View
      style={[
        styles.summaryCard,
        {
          backgroundColor,
        },
      ]}
    >
      <View style={styles.summaryIcon}>
        <MaterialIcons name={icon} size={21} color={iconColor} />
      </View>

      <Text
        style={[
          styles.summaryValue,
          {
            color: theme.textPrimary,
          },
        ]}
      >
        {value}
      </Text>

      <Text
        style={[
          styles.summaryLabel,
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

type SummaryRowProps = {
  label: string;
  value: string;
};

function SummaryRow({ label, value }: SummaryRowProps) {
  const { theme } = useAppTheme();

  return (
    <View style={styles.summaryRow}>
      <Text
        style={[
          styles.rowLabel,
          {
            color: theme.textSecondary,
          },
        ]}
      >
        {label}
      </Text>

      <Text
        style={[
          styles.rowValue,
          {
            color: theme.textPrimary,
          },
        ]}
      >
        {value}
      </Text>
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
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },

  title: {
    fontSize: 18,
    fontWeight: "800",
    marginTop: Spacing.xs,
  },

  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
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
    fontSize: 22,
    fontWeight: "900",
  },

  summaryLabel: {
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
    fontSize: 14,
  },

  rowValue: {
    fontSize: 15,
    fontWeight: "800",
  },

  divider: {
    height: 1,
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
    fontSize: 13,
    fontWeight: "700",
  },

  resultValue: {
    fontSize: 22,
    fontWeight: "900",
  },
});
