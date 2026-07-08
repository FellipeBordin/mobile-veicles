/* eslint-disable react-hooks/exhaustive-deps */
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { ExpenseDTO } from "../../../src/types/expense";

import { buildExpensePayload } from "../../../src/utils/expenseHelpers";
import { Input } from "../../../src/components/common/Input";
import { Card } from "../../../src/components/common/Card";
import { Button } from "../../../src/components/common/Button";

import {
  getExpenseById,
  updateExpenseById,
} from "../../../src/service/expenseService";

export default function EditExpenseScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadExpense();
  }, [id]);

  async function loadExpense() {
    if (!id) return;

    try {
      setLoading(true);

      const res = await getExpenseById(id);
      const data = (await res.json().catch(() => null)) as ExpenseDTO | null;

      if (res.status === 401) {
        Alert.alert("Sessão expirada", "Faça login novamente.");
        router.replace("/login");
        return;
      }

      if (!res.ok || !data) {
        Alert.alert("Erro", (data as any)?.error ?? `Falha (${res.status})`);
        return;
      }

      setNote(data.note ?? "");
      setAmount(String(data.amount));
    } catch {
      Alert.alert("Erro", "Não foi possível carregar a despesa.");
    } finally {
      setLoading(false);
    }
  }

  async function saveExpense() {
    const payload = buildExpensePayload(note, amount);

    if (!Number.isFinite(payload.amount) || payload.amount <= 0) {
      Alert.alert("Atenção", "Preencha o valor da despesa corretamente.");
      return;
    }

    try {
      setSaving(true);

      const res = await updateExpenseById(id, payload);

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

      Alert.alert("Sucesso", "Despesa atualizada com sucesso.");
      router.replace(`/vehicles/${data.vehicleId}`);
    } catch {
      Alert.alert("Erro", "Não foi possível atualizar a despesa.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#f5f5f5",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 16,
        paddingTop: 48,
      }}
    >
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
            <MaterialIcons name="edit-note" size={28} color="#2563eb" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 24, fontWeight: "800" }}>
              Editar despesa
            </Text>
            <Text style={{ color: "#666", marginTop: 4 }}>
              Corrija descrição ou valor da despesa
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
          title="Salvar alterações despesa"
          onPress={saveExpense}
          loading={saving}
          loadingTitle="Salvando..."
        />
      </Card>

      <Pressable
        onPress={() => router.back()}
        style={{ paddingVertical: 14, alignItems: "center", marginTop: 14 }}
      >
        <Text style={{ color: "#111", fontWeight: "700" }}>Cancelar</Text>
      </Pressable>
    </View>
  );
}
