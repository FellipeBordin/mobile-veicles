import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  Text,
  TextInput,
  View,
  TextInputProps,
} from "react-native";
import { apiFetch } from "../src/lib/api";

export default function NewVehicle() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [plate, setPlate] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [previousOwnerName, setPreviousOwnerName] = useState("");
  const [previousOwnerPhone, setPreviousOwnerPhone] = useState("");
  const [loading, setLoading] = useState(false);

  function normalizeCurrency(value: string) {
    return value.trim().replace(/\./g, "").replace(",", ".");
  }

  function isValidPlate(plate: string) {
    const oldplate = /^[A-Z]{3}[0-9]{4}$/;
    const mercosulPlate = /^[0-9][A-Z]{3}[A-Z][0-9]{2}$/;

    return oldplate.test(plate) || mercosulPlate.test(plate);
  }

  async function save() {
    const purchasePriceValue = Number.parseFloat(
      normalizeCurrency(purchasePrice),
    );
    const payload = {
      name: name.trim(),
      plate: plate.trim().toUpperCase(),
      purchasePrice: purchasePriceValue,
      previousOwnerName: previousOwnerName.trim(),
      previousOwnerPhone: previousOwnerPhone.trim(),
    };

    if (!payload.name || !payload.plate) {
      Alert.alert("Atenção", "Preencha o nome e a placa do veículo.");
      return;
    }

    if (!isValidPlate(payload.plate)) {
      Alert.alert("Atenção", "Placa inválida.");
      return;
    }

    if (!Number.isFinite(purchasePriceValue) || purchasePriceValue <= 0) {
      Alert.alert("Atenção", "Preencha o preço de compra corretamente.");
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
        Alert.alert("Sessão expirada", "Faça login novamente.");
        router.replace("/login");
        return;
      }

      if (!res.ok) {
        Alert.alert("Erro", data?.error ?? `Falha (${res.status})`);
        return;
      }

      Alert.alert("Sucesso", "Veículo cadastrado!");
      router.replace("/");
    } catch {
      Alert.alert("Erro", "Não foi possível conectar com a API.");
    } finally {
      setLoading(false);
    }
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
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 20,
          padding: 16,
          borderWidth: 1,
          borderColor: "#e5e5e5",
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 3 },
          elevation: 3,
          gap: 14,
        }}
      >
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

        <Field
          label="Nome do veículo"
          value={name}
          onChangeText={setName}
          placeholder="Ex: Gol 1.6"
        />

        <Field
          label="Placa"
          value={plate}
          onChangeText={setPlate}
          placeholder="Digite a placa do veículo"
          autoCapitalize="characters"
          onBlur={() => setPlate((plate) => plate.trim().toUpperCase())}
        />

        <Field
          label="Preço de compra"
          value={purchasePrice}
          onChangeText={setPurchasePrice}
          placeholder="Digite o valor pago pelo veículo"
          keyboardType="numeric"
        />

        <Field
          label="Nome do ex-proprietário"
          value={previousOwnerName}
          onChangeText={setPreviousOwnerName}
          placeholder="Digite o nome do ex-proprietário"
        />

        <Field
          label="Telefone do ex-proprietário"
          value={previousOwnerPhone}
          onChangeText={setPreviousOwnerPhone}
          placeholder="Digite o telefone"
          keyboardType="phone-pad"
        />

        <Pressable
          onPress={save}
          disabled={loading}
          style={{
            marginTop: 4,
            backgroundColor: "#111",
            paddingVertical: 12,
            borderRadius: 14,
            opacity: loading ? 0.6 : 1,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "800" }}>
            {loading ? "Salvando..." : "Salvar veículo"}
          </Text>
        </Pressable>
      </View>

      <Pressable
        onPress={() => router.back()}
        style={{ paddingVertical: 14, alignItems: "center", marginTop: 14 }}
      >
        <Text style={{ color: "#111", fontWeight: "700" }}>Cancelar</Text>
      </Pressable>
    </View>
  );
}
type FieldProps = TextInputProps & {
  label: string;
};

function Field({ label, ...inputProps }: FieldProps) {
  return (
    <View style={{ gap: 6 }}>
      <Text style={{ fontWeight: "700", color: "#333" }}>{label}</Text>
      <TextInput
        {...inputProps}
        placeholderTextColor="#999"
        style={{
          borderWidth: 1,
          borderColor: "#e5e5e5",
          borderRadius: 14,
          paddingHorizontal: 12,
          paddingVertical: 12,
          backgroundColor: "#f9fafb",
        }}
      />
    </View>
  );
}
