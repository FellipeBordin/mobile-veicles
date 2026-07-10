import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {Pressable, Text, TextInput, View } from "react-native";

import { API_URL } from "../../../src/config/api";
import { Button } from "@/src/components/common/Button";
import {showAlert} from "@/src/utils/alert";

export default function AddExpenseScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  async function save() {
    const payload = {
      note: note.trim(),
      amount: Number(amount),
    };

    if (
      !payload.note ||
      !Number.isFinite(payload.amount) ||
      payload.amount <= 0
    ) {
      showAlert("Atenção", "Preencha a descrição e um valor maior que 0.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/vehicles/${id}/expenses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        showAlert("Erro", data?.error ?? `Falha (${res.status})`);
        return;
      }

      showAlert("Sucesso", "Gasto adicionado!");
      router.back();
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1, padding: 16, paddingTop: 48, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "900" }}>Adicionar gasto</Text>

      <View style={{ gap: 6 }}>
        <Text style={{ fontWeight: "800" }}>Nome/descrição</Text>
        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder="Ex: Pintura, Banco rasgado..."
          style={{
            borderWidth: 1,
            borderColor: "#e5e5e5",
            borderRadius: 12,
            paddingHorizontal: 12,
            paddingVertical: 10,
            backgroundColor: "#fff",
          }}
        />
      </View>

      <View style={{ gap: 6 }}>
        <Text style={{ fontWeight: "800" }}>Valor</Text>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          placeholder="Ex: 800"
          keyboardType="decimal-pad"
          style={{
            borderWidth: 1,
            borderColor: "#e5e5e5",
            borderRadius: 12,
            paddingHorizontal: 12,
            paddingVertical: 10,
            backgroundColor: "#fff",
          }}
        />
      </View>

      <Button
        title="Salvar Gasto"
        loadingTitle="Salvando..."
        onPress={save}
        loading={loading}
      />

      <Pressable
        onPress={() => router.back()}
        style={{ paddingVertical: 10, alignItems: "center" }}
      >
        <Text style={{ color: "#111", fontWeight: "700" }}>Cancelar</Text>
      </Pressable>
    </View>
  );
}
