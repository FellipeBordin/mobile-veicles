import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  View,
} from "react-native";

import { formatBRL } from "@/src/utils/formatters";
import { clearSession, getToken, getUser } from "@/src/lib/session";
import { Vehicle } from "@/src/types/vehicles";
import { calculateVehicleSummary } from "@/src/utils/calculateVehicle";
import { getVehicles, claimLegacyVehicles } from "@/src/service/vehicleService";
import { HomeHeader } from "@/src/components/vehicle/HomeHeader";
import { Card } from "@/src/components/common/Card";
import { ScreenContainer } from "@/src/components/common/ScreenContainer";
import { VehicleSummary } from "@/src/components/vehicle/VehicleSummary";

export default function VehiclesHome() {
  const router = useRouter();

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState("");

  const load = useCallback(async () => {
    setError(null);

    const token = await getToken();

    if (!token) {
      router.replace("/");
      return;
    }

    const user = await getUser();
    setUserName(user?.name ?? "");

    await claimLegacyVehicles();

    const res = await getVehicles();

    if (res.status === 401) {
      await clearSession();
      router.replace("/");
      return;
    }

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`GET /api/vehicles ${res.status} ${text}`);
    }

    const data = (await res.json()) as Vehicle[];
    setVehicles(data);
  }, [router]);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);

      load()
        .catch((e) => setError(String(e?.message ?? e)))
        .finally(() => setLoading(false));
    }, [load]),
  );

  async function onRefresh() {
    setRefreshing(true);
    try {
      await load();
    } catch (e: any) {
      setError(String(e?.message ?? e));
    } finally {
      setRefreshing(false);
    }
  }
  async function logoutNow() {
    await clearSession();
    router.replace("/login");
  }

  function handleLogout() {
    Alert.alert("Sair da conta", "Deseja realmente sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: () => {
          logoutNow().catch(() => {
            Alert.alert("Erro", "Não foi possível sair da conta.");
          });
        },
      },
    ]);
  }

  const summary = useMemo(() => calculateVehicleSummary(vehicles), [vehicles]);

  return (
    <ScreenContainer>
      <HomeHeader
        userName={userName}
        onNewVehicle={() => router.push("/new")}
        onLogout={handleLogout}
      />

      <VehicleSummary summary={summary} />

      {error && (
        <View
          style={{
            marginTop: 12,
            padding: 12,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#fecaca",
            backgroundColor: "#fff",
          }}
        >
          <Text style={{ color: "#b91c1c", fontWeight: "700" }}>Erro</Text>
          <Text style={{ color: "#b91c1c", marginTop: 4 }}>{error}</Text>
        </View>
      )}

      {loading ? (
        <Text style={{ marginTop: 16 }}>Carregando...</Text>
      ) : (
        <FlatList
          style={{ marginTop: 16 }}
          data={vehicles}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => {
            const isSold = item.status === "SOLD";
            const profit = item.profit ?? 0;

            return (
              <Pressable onPress={() => router.push(`/vehicles/${item.id}`)}>
                <Card>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      gap: 12,
                      alignItems: "center",
                    }}
                  >
                    <View style={{ flexDirection: "row", gap: 10, flex: 1 }}>
                      <View
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 12,
                          backgroundColor: isSold ? "#dcfce7" : "#eff6ff",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <MaterialIcons
                          name="directions-car"
                          size={24}
                          color={isSold ? "#15803d" : "#2563eb"}
                        />
                      </View>

                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 16, fontWeight: "800" }}>
                          {item.name}
                        </Text>
                        <Text style={{ color: "#666", marginTop: 2 }}>
                          Placa: {item.plate}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        paddingVertical: 6,
                        paddingHorizontal: 10,
                        borderRadius: 999,
                        backgroundColor: isSold ? "#dcfce7" : "#f3f4f6",
                        alignSelf: "flex-start",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "800",
                          color: isSold ? "#166534" : "#374151",
                        }}
                      >
                        {isSold ? "Vendido" : "Em estoque"}
                      </Text>
                    </View>
                  </View>

                  <View style={{ gap: 6 }}>
                    <Row label="Compra" value={formatBRL(item.purchasePrice)} />
                    <Row label="Gastos" value={formatBRL(item.totalExpenses)} />
                    <Row
                      label="Total investido"
                      value={formatBRL(item.totalInvested)}
                      bold
                    />

                    {isSold && item.soldPrice != null ? (
                      <>
                        <Row
                          label="Venda"
                          value={formatBRL(item.soldPrice)}
                          bold
                        />
                        <Row
                          label="Resultado"
                          value={formatBRL(profit)}
                          bold
                          valueColor={profit >= 0 ? "#0f766e" : "#b91c1c"}
                        />
                      </>
                    ) : (
                      <Row
                        label="Resultado"
                        value="Aguardando venda"
                        bold
                        valueColor="#6b7280"
                      />
                    )}
                  </View>
                </Card>
              </Pressable>
            );
          }}
          ListEmptyComponent={
            <View
              style={{
                marginTop: 16,
                backgroundColor: "#fff",
                borderRadius: 16,
                padding: 16,
                borderWidth: 1,
                borderColor: "#e5e5e5",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "700" }}>
                Nenhum veículo cadastrado.
              </Text>
              <Text style={{ marginTop: 6, color: "#666" }}>
                Toque em “+ Novo” para cadastrar o primeiro veículo.
              </Text>
            </View>
          }
        />
      )}
    </ScreenContainer>
  );
}

function Row({
  label,
  value,
  bold,
  valueColor,
}: {
  label: string;
  value: string;
  bold?: boolean;
  valueColor?: string;
}) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text style={{ color: "#333" }}>{label}</Text>
      <Text
        style={{
          fontWeight: bold ? "800" : "600",
          color: valueColor ?? "#111",
        }}
      >
        {value}
      </Text>
    </View>
  );
}
