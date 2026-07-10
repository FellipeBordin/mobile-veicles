import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {Pressable, Text, View } from "react-native";

import { apiFetch } from "../../../src/lib/api";
import { Input } from "@/src/components/common/Input";
import { Card } from "@/src/components/common/Card";
import { ScreenContainer } from "@/src/components/common/ScreenContainer";
import { Button } from "@/src/components/common/Button";
import {showAlert} from "@/src/utils/alert";

export default function NewExpenseScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  async function saveExpense() {
    const payload = {
      vehicleId: id,
      note: note.trim(),
      amount: Number(amount),
    };

    if (
      !payload.vehicleId ||
      !Number.isFinite(payload.amount) ||
      payload.amount <= 0
    ) {
      showAlert("Atenção", "Preencha o valor da despesa corretamente.");
      return;
    }

    setLoading(true);
    try {
      const res = await apiFetch("/api/expenses", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (res.status === 401) {
        showAlert("Sessão expirada", "Faça login novamente.");
        router.replace("/login");
        return;
      }

      if (!res.ok) {
        showAlert("Erro", data?.error ?? `Falha (${res.status})`);
        return;
      }

      showAlert("Sucesso", "Despesa cadastrada!");
      router.back();
    } catch {
      showAlert("Erro", "Não foi possível salvar a despesa.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScreenContainer>
      <Card>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              backgroundColor: "#eff6ff",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialIcons name="receipt-long" size={28} color="#2563eb" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 24, fontWeight: "800" }}>
              Nova despesa
            </Text>
            <Text style={{ color: "#666", marginTop: 4 }}>
              Informe o que foi gasto e o valor
            </Text>
          </View>
        </View>

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
          title="Salvar despesa"
          loadingTitle="Salvando..."
          onPress={saveExpense}
          loading={loading}
        />
      </Card>

      <Pressable
        onPress={() => router.back()}
        style={{ paddingVertical: 14, alignItems: "center", marginTop: 14 }}
      >
        <Text style={{ color: "#111", fontWeight: "700" }}>Cancelar</Text>
      </Pressable>
    </ScreenContainer>
  );
}
