import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { Card } from "../common/Card";
import { formatBRL } from "../../utils/formatters";

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
  return (
    <Card>
      <Text style={{ fontSize: 16, fontWeight: "800" }}>Resumo geral</Text>

      <View style={{ flexDirection: "row", gap: 12 }}>
        <SummaryCard
          label="Veículos"
          value={String(summary.totalVehicles)}
          icon="directions-car"
          bg="#eff6ff"
          iconColor="#2563eb"
        />

        <SummaryCard
          label="Em estoque"
          value={String(summary.inStockCount)}
          icon="inventory"
          bg="#f3f4f6"
          iconColor="#374151"
        />

        <SummaryCard
          label="Vendidos"
          value={String(summary.soldCount)}
          icon="task-alt"
          bg="#dcfce7"
          iconColor="#16a34a"
        />
      </View>

      <View style={{ gap: 8 }}>
        <SummaryRow
          label="Total investido"
          value={formatBRL(summary.totalInvested)}
        />

        <SummaryRow
          label="Lucro total"
          value={formatBRL(summary.totalProfit)}
          valueColor={summary.totalProfit >= 0 ? "#0f766e" : "#b91c1c"}
        />
      </View>
    </Card>
  );
}

type SummaryCardProps = {
  label: string;
  value: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  bg: string;
  iconColor: string;
};

function SummaryCard({ label, value, icon, bg, iconColor }: SummaryCardProps) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: bg,
        borderRadius: 14,
        padding: 12,
        gap: 8,
      }}
    >
      <MaterialIcons name={icon} size={22} color={iconColor} />
      <Text style={{ fontSize: 18, fontWeight: "800" }}>{value}</Text>
      <Text style={{ fontSize: 12, color: "#555" }}>{label}</Text>
    </View>
  );
}

type SummaryRowProps = {
  label: string;
  value: string;
  valueColor?: string;
};

function SummaryRow({ label, value, valueColor = "#111" }: SummaryRowProps) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text style={{ color: "#444" }}>{label}</Text>
      <Text style={{ fontWeight: "800", color: valueColor }}>{value}</Text>
    </View>
  );
}
