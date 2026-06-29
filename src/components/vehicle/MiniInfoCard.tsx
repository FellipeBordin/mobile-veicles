import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

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

      <Text style={{ fontSize: 15, fontWeight: "800", color: "#111" }}>
        {value}
      </Text>

      <Text style={{ fontSize: 12, color: "#555" }}>{label}</Text>
    </View>
  );
}
