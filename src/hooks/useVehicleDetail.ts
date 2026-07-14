import { useCallback, useState } from "react";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";

import { deleteExpenseById } from "@/src/service/expenseService";
import {
  deleteVehicleById,
  getVehicleById,
} from "@/src/service/vehicleService";
import { Vehicle } from "@/src/types/vehicles";
import { showAlert } from "@/src/utils/alert";

type ApiErrorResponse = {
  error?: string;
};

export function useVehicleDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [deletingExpenseId, setDeletingExpenseId] = useState<string | null>(
    null,
  );

  const load = useCallback(async () => {
    if (!id) {
      setVehicle(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const res = await getVehicleById(id);

      const data = (await res.json().catch(() => null)) as
        | Vehicle
        | ApiErrorResponse
        | null;

      if (res.status === 401) {
        showAlert("Sessão expirada", "Faça login novamente.");
        router.replace("/login");
        return;
      }

      if (!res.ok || !data || !("id" in data)) {
        const message =
          data && "error" in data ? data.error : `Falha (${res.status})`;

        showAlert("Erro", message ?? "Não foi possível carregar o veículo.");

        setVehicle(null);
        return;
      }

      setVehicle(data);
    } catch (error) {
      console.error("Load vehicle error:", error);
      showAlert("Erro", "Não foi possível carregar o veículo.");
      setVehicle(null);
    } finally {
      setLoading(false);
    }
  }, [id, router]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  async function deleteVehicle() {
    if (!vehicle) return;

    try {
      setDeleting(true);

      const res = await deleteVehicleById(vehicle.id);
      const data = (await res.json().catch(() => ({}))) as ApiErrorResponse;

      if (res.status === 401) {
        showAlert("Sessão expirada", "Faça login novamente.");
        router.replace("/login");
        return;
      }

      if (!res.ok) {
        showAlert("Erro", data.error ?? `Falha (${res.status})`);
        return;
      }

      showAlert("Sucesso", "Veículo excluído com sucesso.");
      router.replace("/");
    } catch (error) {
      console.error("Delete vehicle error:", error);
      showAlert("Erro", "Não foi possível excluir o veículo.");
    } finally {
      setDeleting(false);
    }
  }

  async function deleteExpense(expenseId: string) {
    try {
      setDeletingExpenseId(expenseId);

      const res = await deleteExpenseById(expenseId);
      const data = (await res.json().catch(() => ({}))) as ApiErrorResponse;

      if (res.status === 401) {
        showAlert("Sessão expirada", "Faça login novamente.");
        router.replace("/login");
        return;
      }

      if (!res.ok) {
        showAlert("Erro", data.error ?? `Falha (${res.status})`);
        return;
      }

      showAlert("Sucesso", "Despesa excluída com sucesso.");
      await load();
    } catch (error) {
      console.error("Delete expense error:", error);
      showAlert("Erro", "Não foi possível excluir a despesa.");
    } finally {
      setDeletingExpenseId(null);
    }
  }

  return {
    router,
    vehicle,
    loading,
    deleting,
    deletingExpenseId,
    deleteVehicle,
    deleteExpense,
  };
}
