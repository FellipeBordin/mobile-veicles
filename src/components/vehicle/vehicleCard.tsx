import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Card } from "../common/Card";
import { formatBRL } from "../../utils/formatters";
import { Vehicle } from "../../types/vehicles";
import { Radius } from "@/src/styles/radius";
import { Spacing } from "@/src/styles/spacing";
import { Theme } from "@/src/styles/theme";

type VehicleCardProps = {
  vehicle: Vehicle;
  onPress: () => void;
};

export function VehicleCard({ vehicle, onPress }: VehicleCardProps) {
  const isSold = vehicle.status === "SOLD";
  const profit = vehicle.profit ?? 0;
  const hasProfit = profit >= 0;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <Card>
        <View style={styles.header}>
          <View style={styles.vehicleInfo}>
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: isSold
                    ? Theme.successLight
                    : Theme.accentLight,
                },
              ]}
            >
              <MaterialIcons
                name="directions-car"
                size={24}
                color={isSold ? Theme.successDark : Theme.accent}
              />
            </View>

            <View style={styles.titleContainer}>
              <Text style={styles.name}>{vehicle.name}</Text>
              <Text style={styles.plate}>Placa: {vehicle.plate}</Text>
            </View>
          </View>

          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: isSold
                  ? Theme.successLight
                  : Theme.accentLight,
              },
            ]}
          >
            <View
              style={[
                styles.statusDot,
                {
                  backgroundColor: isSold ? Theme.successDark : Theme.accent,
                },
              ]}
            />

            <Text
              style={[
                styles.statusText,
                {
                  color: isSold ? Theme.successDark : Theme.accentDark,
                },
              ]}
            >
              {isSold ? "Vendido" : "Em estoque"}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.values}>
          <Row label="Compra" value={formatBRL(vehicle.purchasePrice)} />

          <Row label="Gastos" value={formatBRL(vehicle.totalExpenses)} />

          <Row
            label="Total investido"
            value={formatBRL(vehicle.totalInvested)}
            bold
          />

          {isSold && vehicle.soldPrice != null ? (
            <>
              <Row label="Venda" value={formatBRL(vehicle.soldPrice)} bold />

              <View
                style={[
                  styles.resultContainer,
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
                    size={18}
                    color={hasProfit ? Theme.successDark : Theme.dangerDark}
                  />

                  <Text style={styles.resultLabel}>Resultado</Text>
                </View>

                <Text
                  style={[
                    styles.resultValue,
                    {
                      color: hasProfit ? Theme.successDark : Theme.dangerDark,
                    },
                  ]}
                >
                  {formatBRL(profit)}
                </Text>
              </View>
            </>
          ) : (
            <View style={styles.pendingContainer}>
              <MaterialIcons
                name="schedule"
                size={18}
                color={Theme.textSecondary}
              />

              <Text style={styles.pendingText}>Aguardando venda</Text>
            </View>
          )}
        </View>
      </Card>
    </Pressable>
  );
}

type RowProps = {
  label: string;
  value: string;
  bold?: boolean;
};

function Row({ label, value, bold = false }: RowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>

      <Text style={[styles.rowValue, bold && styles.rowValueBold]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.78,
    transform: [{ scale: 0.99 }],
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: Spacing.md,
  },

  vehicleInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    flex: 1,
  },

  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: Radius.lg,
    alignItems: "center",
    justifyContent: "center",
  },

  titleContainer: {
    flex: 1,
  },

  name: {
    color: Theme.textPrimary,
    fontSize: 17,
    fontWeight: "800",
  },

  plate: {
    color: Theme.textSecondary,
    fontSize: 13,
    marginTop: Spacing.xs,
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    paddingVertical: 6,
    paddingHorizontal: Spacing.sm,
    borderRadius: Radius.full,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: Radius.full,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "800",
  },

  divider: {
    height: 1,
    backgroundColor: Theme.border,
  },

  values: {
    gap: Spacing.sm,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  rowLabel: {
    color: Theme.textSecondary,
    fontSize: 14,
  },

  rowValue: {
    color: Theme.textPrimary,
    fontSize: 14,
    fontWeight: "600",
  },

  rowValueBold: {
    fontWeight: "800",
  },

  resultContainer: {
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginTop: Spacing.xs,
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
    fontSize: 20,
    fontWeight: "900",
  },

  pendingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    backgroundColor: Theme.surfaceMuted,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginTop: Spacing.xs,
  },

  pendingText: {
    color: Theme.textSecondary,
    fontSize: 13,
    fontWeight: "700",
  },
});
