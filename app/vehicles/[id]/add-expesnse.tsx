import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";

import { Button } from "@/src/components/common/Button";
import { Card } from "@/src/components/common/Card";
import { Input } from "@/src/components/common/Input";
import { ScreenContainer } from "@/src/components/common/ScreenContainer";
import { ScreenHeader } from "@/src/components/common/ScreenHeader";
import { createExpenseByVehicleId } from "@/src/service/expenseService";
import { showAlert } from "@/src/utils/alert";
import { buildExpensePayload } from "@/src/utils/expenseHelpers";

type ApiResponse = {
  error?: string;
};

export default function AddExpenseScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  async function saveExpense() {
    if (!id) {
      showAlert("Erro", "Veículo não encontrado.");
      return;
    }

    const payload = buildExpensePayload(note, amount);

    if (!payload.note) {
      showAlert("Atenção", "Informe a descrição da despesa.");
      return;
    }

    if (!Number.isFinite(payload.amount) || payload.amount <= 0) {
      showAlert("Atenção", "Informe um valor maior que zero.");
      return;
    }

    try {
      setLoading(true);

      const res = await createExpenseByVehicleId(id, payload);

      const data = (await res.json().catch(() => ({}))) as ApiResponse;

      if (res.status === 401) {
        showAlert("Sessão expirada", "Faça login novamente.");
        router.replace("/login");
        return;
      }

      if (!res.ok) {
        showAlert("Erro", data.error ?? `Falha (${res.status})`);
        return;
      }

      showAlert("Sucesso", "Despesa adicionada com sucesso.");
      router.back();
    } catch (error) {
      console.error("Create expense error:", error);
      showAlert("Erro", "Não foi possível adicionar a despesa.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScreenContainer>
      <Card>
        <ScreenHeader
          icon="add-card"
          title="Adicionar despesa"
          subtitle="Registre os gastos relacionados a este veículo"
        />

        <Input
          label="Descrição"
          value={note}
          onChangeText={setNote}
          placeholder="Ex: pintura, pneu, documentação"
        />

        <Input
          label="Valor gasto"
          value={amount}
          onChangeText={(text) => {
            const currencyCharacters = text.replace(/[^0-9.,]/g, "");
            setAmount(currencyCharacters);
          }}
          placeholder="Ex: 800,00"
          keyboardType="decimal-pad"
        />

        <Button
          title="Salvar despesa"
          loadingTitle="Salvando..."
          loading={loading}
          onPress={saveExpense}
        />
      </Card>

      <Button title="Cancelar" onPress={() => router.back()} />
    </ScreenContainer>
  );
}
