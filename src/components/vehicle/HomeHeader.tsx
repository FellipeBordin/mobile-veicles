import { Text, View } from "react-native";
import { Button } from "../common/Button";

type HomeHeaderProps = {
  userName: string;
  onNewVehicle: () => void;
  onLogout: () => void;
};

export function HomeHeader({
  userName,
  onNewVehicle,
  onLogout,
}: HomeHeaderProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 28, fontWeight: "800" }}>Veículos</Text>

        <Text style={{ color: "#666", marginTop: 4 }}>
          {userName
            ? `Olá, ${userName}`
            : "Controle de compra, despesas e lucro"}
        </Text>
      </View>

      <View style={{ flexDirection: "row", gap: 10 }}>
        <Button title="+ Novo" onPress={onNewVehicle} />
        <Button title="Sair" onPress={onLogout} variant="danger" />
      </View>
    </View>
  );
}
