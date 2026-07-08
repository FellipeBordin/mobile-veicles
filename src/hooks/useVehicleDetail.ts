import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";

import { Vehicle } from "@/src/types/veicles";
import {deleteVehicleById,getVehicleById,} from "@/src/service/vehicleService";
import { deleteExpenseById } from "@/src/service/expenseService";

export function useVehicleDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [deletingExpenseId, setDeletingExpenseId] = useState<string | null>(
    null,
  );

  async function load() {
    if (!id) return;

    try {
      setLoading(true);

      const res = await getVehicleById(id);
      const data = await res.json().catch(() => null);

      if (res.status === 401) {
        Alert.alert("Sessão expirada", "Faça login novamente.");
        router.replace("/login");
        return;
      }

      if (!res.ok) {
        Alert.alert("Erro", data?.error ?? `Falha (${res.status})`);
        return;
      }

      setVehicle(data);
    } catch {
      Alert.alert("Erro", "Não foi possível carregar o veículo.");
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      load();
    }, [id]),
  );

  async function deleteVehicle() {
    if (!vehicle) return;

    try {
      setDeleting(true);

      const vehicleId = vehicle.id ?? id;
      const res = await deleteVehicleById(vehicleId as string);
      const data = await res.json().catch(() => ({}));

      if (res.status === 401) {
        Alert.alert("Sessão expirada", "Faça login novamente.");
        router.replace("/login");
        return;
      }

      if (!res.ok) {
        Alert.alert("Erro", data?.error ?? `Falha (${res.status})`);
        return;
      }

      Alert.alert("Sucesso", "Veículo excluído com sucesso.");
      router.replace("/");
    } catch {
      Alert.alert("Erro", "Não foi possível excluir o veículo.");
    } finally {
      setDeleting(false);
    }
  }

  async function deleteExpense(expenseId: string) {
    try {
      setDeletingExpenseId(expenseId);

      const res = await deleteExpenseById(expenseId);
      const data = await res.json().catch(() => ({}));

      if (res.status === 401) {
        Alert.alert("Sessão expirada", "Faça login novamente.");
        router.replace("/login");
        return;
      }

      if (!res.ok) {
        Alert.alert("Erro", data?.error ?? `Falha (${res.status})`);
        return;
      }

      Alert.alert("Sucesso", "Despesa excluída com sucesso.");
      await load();
    } catch {
      Alert.alert("Erro", "Não foi possível excluir a despesa.");
    } finally {
      setDeletingExpenseId(null);
    }
  }

  return {
    id,
    router,
    vehicle,
    loading,
    deleting,
    deletingExpenseId,
    load,
    deleteVehicle,
    deleteExpense,
  };
}