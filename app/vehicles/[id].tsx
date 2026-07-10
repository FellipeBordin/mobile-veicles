"use client";

import { ExpenseItem } from "@/src/components/vehicle/ExpenseItem";
import { MiniInfoCard } from "@/src/components/vehicle/MiniInfoCard";
import { InfoBlock } from "@/src/components/vehicle/InfoBlock";
import { formatBRL, formatDate } from "../../src/utils/formatters";
import { Card } from "@/src/components/common/Card";
import { getProfitStyle } from "@/src/utils/VehicleHelpers";
import { useVehicleDetail } from "@/src/hooks/useVehicleDetail";

import { Pressable, ScrollView, Text, View } from "react-native";
import { Button } from "@/src/components/common/Button";
import { LoadingState } from "@/src/components/common/LoadingState";
import { EmptyState } from "@/src/components/common/EmptyState";
import { VehicleHeader } from "@/src/components/vehicle/VehicleHeader";
import { confirmAction } from "@/src/utils/confirm";

export default function VehicleDetailScreen() {
  const {
    router,
    vehicle,
    loading,
    deleting,
    deletingExpenseId,
    deleteVehicle,
    deleteExpense,
  } = useVehicleDetail();

  function handleDeleteExpense(expenseId: string) {
    confirmAction({
      title: "Excluir despesa",
      message: "Tem certeza que deseja excluir esta despesa?",
      onConfirm: () => deleteExpense(expenseId),
    });
  }

  function handleDeleteVehicle() {
    if (!vehicle) return;

    confirmAction({
      title: "Excluir veículo",
      message: `Tem certeza que deseja excluir "${vehicle.name}"?`,
      onConfirm: deleteVehicle,
    });
  }

  if (loading) {
    return <LoadingState />;
  }

  if (!vehicle) {
    return (
      <EmptyState
        message="Veículo não encontrado."
        buttonTitle="Voltar"
        onPress={() => router.back()}
      />
    );
  }

  const isSold = vehicle.status === "SOLD";
  const profitStyle = getProfitStyle(vehicle.profit);

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 16,
        paddingTop: 48,
        gap: 14,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card>
        <VehicleHeader
          name={vehicle.name}
          plate={vehicle.plate}
          isSold={isSold}
        />

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
            backgroundColor: profitStyle.bg,
            borderRadius: 16,
            padding: 14,
            gap: 6,
          }}
        >
          <Text style={{ fontSize: 13, color: "#555" }}>Lucro / Prejuízo</Text>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "800",
              color: profitStyle.color,
            }}
          >
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

        <Button
          title="Excluir veículo"
          loadingTitle="Excluindo..."
          onPress={handleDeleteVehicle}
          loading={deleting}
        />
      </Card>

      <Card>
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
      </Card>

      <Pressable
        onPress={() => router.back()}
        style={{ paddingVertical: 12, alignItems: "center" }}
      >
        <Text style={{ color: "#111", fontWeight: "700" }}>Voltar</Text>
      </Pressable>
    </ScrollView>
  );
}
