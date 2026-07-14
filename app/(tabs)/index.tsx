import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";

import { EmptyState } from "@/src/components/common/EmptyState";
import { ErrorState } from "@/src/components/common/ErrorState";
import { LoadingState } from "@/src/components/common/LoadingState";
import { ScreenContainer } from "@/src/components/common/ScreenContainer";
import { HomeHeader } from "@/src/components/vehicle/HomeHeader";
import { VehicleCard } from "@/src/components/vehicle/vehicleCard";
import { VehicleSummary } from "@/src/components/vehicle/VehicleSummary";
import { clearSession, getToken, getUser } from "@/src/lib/session";
import { claimLegacyVehicles, getVehicles } from "@/src/service/vehicleService";
import { Spacing } from "@/src/styles/spacing";
import { Vehicle } from "@/src/types/vehicles";
import { calculateVehicleSummary } from "@/src/utils/calculateVehicle";

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
      router.replace("/login");
      return;
    }

    const user = await getUser();
    setUserName(user?.name ?? "");

    await claimLegacyVehicles();

    const res = await getVehicles();

    if (res.status === 401) {
      await clearSession();
      router.replace("/login");
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
        .catch((error: unknown) => {
          setError(getErrorMessage(error));
        })
        .finally(() => {
          setLoading(false);
        });
    }, [load]),
  );

  async function onRefresh() {
    setRefreshing(true);

    try {
      await load();
    } catch (error: unknown) {
      setError(getErrorMessage(error));
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
      {
        text: "Cancelar",
        style: "cancel",
      },
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

      {error ? <ErrorState message={error} /> : null}

      {loading ? (
        <LoadingState message="Carregando veículos..." />
      ) : (
        <FlatList
          style={styles.list}
          data={vehicles}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={ListSeparator}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <VehicleCard
              vehicle={item}
              onPress={() => router.push(`/vehicles/${item.id}`)}
            />
          )}
          ListEmptyComponent={
            <EmptyState
              title="Nenhum veículo cadastrado"
              message="Cadastre o primeiro veículo para começar a controlar compras, despesas e vendas."
              buttonTitle="+ Novo veículo"
              onPress={() => router.push("/new")}
            />
          }
        />
      )}
    </ScreenContainer>
  );
}

function ListSeparator() {
  return <View style={styles.separator} />;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

const styles = StyleSheet.create({
  list: {
    marginTop: Spacing.lg,
  },

  separator: {
    height: Spacing.md,
  },
});
