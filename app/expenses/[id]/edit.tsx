import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState, useCallback } from "react";

import { Button } from "@/src/components/common/Button";
import { Card } from "@/src/components/common/Card";
import { Input } from "@/src/components/common/Input";
import { LoadingState } from "@/src/components/common/LoadingState";
import { ScreenContainer } from "@/src/components/common/ScreenContainer";
import { ScreenHeader } from "@/src/components/common/ScreenHeader";
import { ExpenseDTO } from "@/src/types/expense";
import { showAlert } from "@/src/utils/alert";
import { buildExpensePayload } from "@/src/utils/expenseHelpers";
import {
  getExpenseById,
  updateExpenseById,
} from "@/src/service/expenseService";

type ApiErrorResponse = {
  error?: string;
};

export default function EditExpenseScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadExpense = useCallback(async () => {
    if (!id) {
      showAlert("Erro", "Despesa não encontrada.");
      router.back();
      return;
    }

    try {
      setLoading(true);

      const res = await getExpenseById(id);
      const data = (await res.json().catch(() => null)) as
        | ExpenseDTO
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

        showAlert("Erro", message ?? "Não foi possível carregar a despesa.");
        return;
      }

      setNote(data.note ?? "");
      setAmount(String(data.amount));
    } catch (error) {
      console.error("Load expense error:", error);
      showAlert("Erro", "Não foi possível carregar a despesa.");
    } finally {
      setLoading(false);
    }
  }, [id, router]);

  useEffect(() => {
    loadExpense();
  }, [loadExpense]);

  async function saveExpense() {
    if (!id) {
      showAlert("Erro", "Despesa não encontrada.");
      return;
    }

    const payload = buildExpensePayload(note, amount);

    if (!Number.isFinite(payload.amount) || payload.amount <= 0) {
      showAlert("Atenção", "Preencha o valor da despesa corretamente.");
      return;
    }

    try {
      setSaving(true);

      const res = await updateExpenseById(id, payload);
      const data = (await res.json().catch(() => ({}))) as ApiErrorResponse & {
        vehicleId?: string;
      };

      if (res.status === 401) {
        showAlert("Sessão expirada", "Faça login novamente.");
        router.replace("/login");
        return;
      }

      if (!res.ok) {
        showAlert("Erro", data.error ?? `Falha (${res.status})`);
        return;
      }

      if (!data.vehicleId) {
        showAlert("Erro", "A API não retornou o veículo da despesa.");
        return;
      }

      showAlert("Sucesso", "Despesa atualizada com sucesso.");
      router.replace(`/vehicles/${data.vehicleId}`);
    } catch (error) {
      console.error("Update expense error:", error);
      showAlert("Erro", "Não foi possível atualizar a despesa.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <LoadingState message="Carregando despesa..." />;
  }

  return (
    <ScreenContainer>
      <Card>
        <ScreenHeader
          icon="edit-note"
          title="Editar despesa"
          subtitle="Corrija a descrição ou o valor da despesa"
        />

        <Input
          label="Descrição"
          value={note}
          onChangeText={setNote}
          placeholder="Ex: banco rasgado, pneu furado"
        />

        <Input
          label="Valor gasto"
          value={amount}
          onChangeText={setAmount}
          placeholder="Digite o valor gasto"
          keyboardType="decimal-pad"
        />

        <Button
          title="Salvar alterações"
          loadingTitle="Salvando..."
          loading={saving}
          onPress={saveExpense}
        />
      </Card>

      <Button title="Cancelar" onPress={() => router.back()} />
    </ScreenContainer>
  );
}
