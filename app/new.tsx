import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

import { apiFetch } from "@/src/lib/api";
import { Input } from "@/src/components/common/Input";
import { Button } from "@/src/components/common/Button";
import { Card } from "@/src/components/common/Card";
import { isValidPlate } from "@/src/utils/validators";
import { parseCurrency } from "@/src/utils/expenseHelpers";
import { ScreenContainer } from "@/src/components/common/ScreenContainer";
import { showAlert } from "@/src/utils/alert";

export default function NewVehicle() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [plate, setPlate] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [previousOwnerName, setPreviousOwnerName] = useState("");
  const [previousOwnerPhone, setPreviousOwnerPhone] = useState("");
  const [loading, setLoading] = useState(false);

  async function save() {
    const purchasePriceValue = parseCurrency(purchasePrice);
    const payload = {
      name: name.trim(),
      plate: plate.trim().toUpperCase(),
      purchasePrice: purchasePriceValue,
      previousOwnerName: previousOwnerName.trim(),
      previousOwnerPhone: previousOwnerPhone.trim(),
    };

    if (!payload.name || !payload.plate) {
      showAlert("Atenção", "Preencha o nome e a placa do veículo.");
      return;
    }

    if (!isValidPlate(payload.plate)) {
      showAlert("Atenção", "Placa inválida.");
      console.log("Placa inválida:", payload.plate);
      return;
    }

    if (!Number.isFinite(purchasePriceValue) || purchasePriceValue <= 0) {
      showAlert("Atenção", "Preencha o preço de compra corretamente.");
      return;
    }

    setLoading(true);
    try {
      const res = await apiFetch("/api/vehicles", {
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

      showAlert("Sucesso", "Veículo cadastrado!");
      router.replace("/");
    } catch {
      showAlert("Erro", "Não foi possível conectar com a API.");
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
            <MaterialIcons name="directions-car" size={28} color="#2563eb" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 24, fontWeight: "800" }}>
              Novo veículo
            </Text>
            <Text style={{ color: "#666", marginTop: 4 }}>
              Cadastre um veículo para controlar compra, despesas e venda
            </Text>
          </View>
        </View>

        <Input
          label="Nome do veículo"
          value={name}
          onChangeText={setName}
          placeholder="Ex: Gol 1.6"
        />

        <Input
          label="Placa"
          value={plate}
          onChangeText={setPlate}
          placeholder="Digite a placa do veículo"
          autoCapitalize="characters"
          onBlur={() => setPlate((plate) => plate.trim().toUpperCase())}
        />

        <Input
          label="Preço de compra"
          value={purchasePrice}
          onChangeText={setPurchasePrice}
          placeholder="Digite o valor pago pelo veículo"
          keyboardType="decimal-pad"
        />

        <Input
          label="Nome do ex-proprietário"
          value={previousOwnerName}
          onChangeText={setPreviousOwnerName}
          placeholder="Digite o nome do ex-proprietário"
        />

        <Input
          label="Telefone do ex-proprietário"
          value={previousOwnerPhone}
          onChangeText={setPreviousOwnerPhone}
          placeholder="Digite o telefone"
          keyboardType="phone-pad"
        />

        <Button
          title="Salvar veículo"
          loadingTitle="Salvando..."
          loading={loading}
          onPress={save}
        />
      </Card>

      <Button title="Voltar" onPress={() => router.back()} />
    </ScreenContainer>
  );
}
