import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Card } from "@/src/components/common/Card";
import { useAppTheme } from "@/src/contexts/ThemeContexte";
import { Radius } from "@/src/styles/radius";
import { Spacing } from "@/src/styles/spacing";
import { Vehicle } from "@/src/types/vehicles";
import { formatBRL } from "@/src/utils/formatters";

type VehicleCardProps = {
  vehicle: Vehicle;
  onPress: () => void;
};

export function VehicleCard({ vehicle, onPress }: VehicleCardProps) {
  const { theme } = useAppTheme();

  const isSold = vehicle.status === "SOLD";
  const profit = vehicle.profit ?? 0;
  const hasProfit = profit >= 0;

  const statusBackgroundColor = isSold ? theme.successLight : theme.accentLight;

  const statusColor = isSold ? theme.successDark : theme.accent;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
    >
      <Card>
        <View style={styles.header}>
          <View style={styles.vehicleInfo}>
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: statusBackgroundColor,
                },
              ]}
            >
              <MaterialIcons
                name="directions-car"
                size={24}
                color={statusColor}
              />
            </View>

            <View style={styles.titleContainer}>
              <Text
                style={[
                  styles.name,
                  {
                    color: theme.textPrimary,
                  },
                ]}
              >
                {vehicle.name}
              </Text>

              <Text
                style={[
                  styles.plate,
                  {
                    color: theme.textSecondary,
                  },
                ]}
              >
                Placa: {vehicle.plate}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: statusBackgroundColor,
              },
            ]}
          >
            <View
              style={[
                styles.statusDot,
                {
                  backgroundColor: statusColor,
                },
              ]}
            />

            <Text
              style={[
                styles.statusText,
                {
                  color: isSold ? theme.successDark : theme.accentDark,
                },
              ]}
            >
              {isSold ? "Vendido" : "Em estoque"}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.divider,
            {
              backgroundColor: theme.border,
            },
          ]}
        />

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
                      ? theme.successLight
                      : theme.dangerLight,
                  },
                ]}
              >
                <View style={styles.resultLabelContainer}>
                  <MaterialIcons
                    name={hasProfit ? "trending-up" : "trending-down"}
                    size={18}
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
                    Resultado
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
                  {formatBRL(profit)}
                </Text>
              </View>
            </>
          ) : (
            <View
              style={[
                styles.pendingContainer,
                {
                  backgroundColor: theme.surfaceMuted,
                },
              ]}
            >
              <MaterialIcons
                name="schedule"
                size={18}
                color={theme.textSecondary}
              />

              <Text
                style={[
                  styles.pendingText,
                  {
                    color: theme.textSecondary,
                  },
                ]}
              >
                Aguardando venda
              </Text>
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
  const { theme } = useAppTheme();

  return (
    <View style={styles.row}>
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
          bold && styles.rowValueBold,
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pressable: {
    borderRadius: Radius.xl,
  },

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
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
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
    fontSize: 17,
    fontWeight: "800",
  },

  plate: {
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
    fontSize: 14,
  },

  rowValue: {
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
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginTop: Spacing.xs,
  },

  pendingText: {
    fontSize: 13,
    fontWeight: "700",
  },
});
