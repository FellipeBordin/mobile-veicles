/* eslint-disable react-hooks/exhaustive-deps */

"use client";
import { Vehicle } from "../../src/types/veicles";
import { ExpenseItem } from "../../src/components/vehicle/ExpenseItem";

import { deleteExpenseById } from "../../src/service/expenseService";
import { MiniInfoCard } from "../../src/components/vehicle/MiniInfoCard";
import { InfoBlock } from "../../src/components/vehicle/InfoBlock";
import { formatBRL, formatDate } from "../../src/utils/formatters";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  deleteVehicleById,
  getVehicleById,
} from "../../src/service/vehicleService";
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function VehicleDetailScreen() {
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

  function handleDeleteVehicle() {
    if (!vehicle) return;

    if (Platform.OS === "web") {
      const confirmed = window.confirm(
        `Tem certeza que deseja excluir "${vehicle.name}"?`,
      );

      if (confirmed) {
        deleteVehicle();
      }

      return;
    }

    Alert.alert(
      "Excluir veículo",
      `Tem certeza que deseja excluir "${vehicle.name}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: deleteVehicle,
        },
      ],
    );
  }

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

  function handleDeleteExpense(expenseId: string) {
    if (Platform.OS === "web") {
      const confirmed = window.confirm(
        "Deseja realmente excluir esta despesa?",
      );

      if (confirmed) {
        deleteExpense(expenseId);
      }

      return;
    }

    Alert.alert("Excluir despesa", "Deseja realmente excluir esta despesa?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => deleteExpense(expenseId),
      },
    ]);
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

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
          backgroundColor: "#f5f5f5",
        }}
      >
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (!vehicle) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
          backgroundColor: "#f5f5f5",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "700" }}>
          Veículo não encontrado.
        </Text>

        <Pressable
          onPress={() => router.back()}
          style={{
            marginTop: 16,
            backgroundColor: "#111",
            paddingHorizontal: 18,
            paddingVertical: 12,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "800" }}>Voltar</Text>
        </Pressable>
      </View>
    );
  }

  const isSold = vehicle.status === "SOLD";

  const profitColor =
    vehicle.profit == null
      ? "#111"
      : vehicle.profit > 0
        ? "#0f766e"
        : vehicle.profit < 0
          ? "#b91c1c"
          : "#111";

  const profitBg =
    vehicle.profit == null
      ? "#f3f4f6"
      : vehicle.profit > 0
        ? "#ccfbf1"
        : vehicle.profit < 0
          ? "#fee2e2"
          : "#f3f4f6";

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 16,
        paddingTop: 48,
        gap: 14,
        backgroundColor: "#f5f5f5",
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 12,
          }}
        >
          <View style={{ flexDirection: "row", gap: 12, flex: 1 }}>
            <View
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                backgroundColor: isSold ? "#dcfce7" : "#eff6ff",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialIcons
                name="directions-car"
                size={28}
                color={isSold ? "#15803d" : "#2563eb"}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 24, fontWeight: "800" }}>
                {vehicle.name}
              </Text>
              <Text style={{ color: "#666", marginTop: 4 }}>
                Placa: {vehicle.plate}
              </Text>
            </View>
          </View>

          <View
            style={{
              paddingVertical: 6,
              paddingHorizontal: 10,
              borderRadius: 999,
              backgroundColor: isSold ? "#dcfce7" : "#f3f4f6",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "800",
                color: isSold ? "#166534" : "#374151",
              }}
            >
              {isSold ? "Vendido" : "Em estoque"}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", gap: 12 }}>
          <MiniInfoCard
            icon="calendar-month"
            label="Data da compra"
            value={formatDate(vehicle.purchaseDate)}
            bg="#f9fafb"
            iconColor="#374151"
          />
          <MiniInfoCard
            icon="sell"
            label="Data da venda"
            value={formatDate(vehicle.soldDate)}
            bg={isSold ? "#dcfce7" : "#f9fafb"}
            iconColor={isSold ? "#15803d" : "#374151"}
          />
        </View>

        <View style={{ flexDirection: "row", gap: 12 }}>
          <MiniInfoCard
            icon="receipt-long"
            label="Qtd. despesas"
            value={String(vehicle.expenses.length)}
            bg="#eff6ff"
            iconColor="#2563eb"
          />
          <MiniInfoCard
            icon="account-balance-wallet"
            label="Investido"
            value={formatBRL(vehicle.totalInvested)}
            bg="#f9fafb"
            iconColor="#374151"
          />
        </View>

        <InfoBlock
          title="Dados da compra"
          rows={[
            {
              label: "Preço de compra",
              value: formatBRL(vehicle.purchasePrice),
            },
            {
              label: "Ex-proprietário",
              value: vehicle.previousOwnerName || "-",
            },
            { label: "Telefone", value: vehicle.previousOwnerPhone || "-" },
          ]}
        />

        <InfoBlock
          title="Dados da venda"
          rows={[
            {
              label: "Valor de venda",
              value:
                vehicle.soldPrice != null ? formatBRL(vehicle.soldPrice) : "-",
            },
            { label: "Comprador", value: vehicle.buyerName || "-" },
            { label: "Telefone", value: vehicle.buyerPhone || "-" },
          ]}
        />

        <View
          style={{
            backgroundColor: profitBg,
            borderRadius: 16,
            padding: 14,
            gap: 6,
          }}
        >
          <Text style={{ fontSize: 13, color: "#555" }}>Lucro / Prejuízo</Text>
          <Text style={{ fontSize: 22, fontWeight: "800", color: profitColor }}>
            {vehicle.profit != null ? formatBRL(vehicle.profit) : "-"}
          </Text>
        </View>

        <View style={{ flexDirection: "row", gap: 12, marginTop: 4 }}>
          <Pressable
            onPress={() => router.push(`/vehicles/${vehicle.id}/expense`)}
            style={{
              flex: 1,
              backgroundColor: "#111",
              paddingVertical: 12,
              borderRadius: 14,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "800" }}>
              Adicionar despesa
            </Text>
          </Pressable>

          {!isSold && (
            <Pressable
              onPress={() => router.push(`/vehicles/${vehicle.id}/sell`)}
              style={{
                flex: 1,
                backgroundColor: "#16a34a",
                paddingVertical: 12,
                borderRadius: 14,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "800" }}>
                Marcar vendido
              </Text>
            </Pressable>
          )}
        </View>

        <Pressable
          onPress={handleDeleteVehicle}
          disabled={deleting}
          style={{
            backgroundColor: "#dc2626",
            paddingVertical: 12,
            borderRadius: 14,
            alignItems: "center",
            opacity: deleting ? 0.6 : 1,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "800" }}>
            {deleting ? "Excluindo..." : "Excluir veículo"}
          </Text>
        </Pressable>
      </View>

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
          gap: 12,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "800" }}>Despesas</Text>

        {vehicle.expenses.length === 0 ? (
          <View
            style={{
              backgroundColor: "#f9fafb",
              borderRadius: 14,
              padding: 14,
              borderWidth: 1,
              borderColor: "#e5e5e5",
            }}
          >
            <Text style={{ color: "#666" }}>Nenhuma despesa cadastrada.</Text>
          </View>
        ) : (
          vehicle.expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              note={expense.note}
              amount={expense.amount}
              createdAt={expense.createdAt}
              onEdit={() =>
                router.push({
                  pathname: "/expenses/[id]/edit",
                  params: { id: expense.id },
                })
              }
              onDelete={() => handleDeleteExpense(expense.id)}
              deleting={deletingExpenseId === expense.id}
            />
          ))
        )}
      </View>

      <Pressable
        onPress={() => router.back()}
        style={{ paddingVertical: 12, alignItems: "center" }}
      >
        <Text style={{ color: "#111", fontWeight: "700" }}>Voltar</Text>
      </Pressable>
    </ScrollView>
  );
}
