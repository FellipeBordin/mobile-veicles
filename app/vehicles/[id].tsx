import { ScrollView, Text, View, StyleSheet } from "react-native";

import { ExpenseItem } from "@/src/components/vehicle/ExpenseItem";
import { MiniInfoCard } from "@/src/components/vehicle/MiniInfoCard";
import { InfoBlock } from "@/src/components/vehicle/InfoBlock";
import { formatBRL, formatDate } from "@/src/utils/formatters";
import { Card } from "@/src/components/common/Card";
import { useVehicleDetail } from "@/src/hooks/useVehicleDetail";
import { Button } from "@/src/components/common/Button";
import { LoadingState } from "@/src/components/common/LoadingState";
import { EmptyState } from "@/src/components/common/EmptyState";
import { VehicleHeader } from "@/src/components/vehicle/VehicleHeader";
import { confirmAction } from "@/src/utils/confirm";
import { Spacing } from "@/src/styles/spacing";
import { Theme } from "@/src/styles/theme";
import { ProfitResult } from "@/src/components/vehicle/ProfitResult";
import { Radius } from "@/src/styles/radius";
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
    return <LoadingState message="Carregando veículo..." />;
  }

  if (!vehicle) {
    return (
      <EmptyState
        title="Veículo não encontrado"
        message="Veículo não encontrado."
        buttonTitle="Voltar"
        onPress={() => router.back()}
      />
    );
  }

  const isSold = vehicle.status === "SOLD";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card>
        <VehicleHeader
          name={vehicle.name}
          plate={vehicle.plate}
          isSold={isSold}
        />

        <View style={styles.infoRow}>
          <MiniInfoCard
            icon="calendar-month"
            label="Data da compra"
            value={formatDate(vehicle.purchaseDate)}
            bg={Theme.surfaceMuted}
            iconColor={Theme.textSecondary}
          />

          <MiniInfoCard
            icon="sell"
            label="Data da venda"
            value={formatDate(vehicle.soldDate)}
            bg={isSold ? Theme.successLight : Theme.surfaceMuted}
            iconColor={isSold ? Theme.successDark : Theme.textSecondary}
          />
        </View>

        <View style={styles.infoRow}>
          <MiniInfoCard
            icon="receipt-long"
            label="Qtd. despesas"
            value={String(vehicle.expenses.length)}
            bg={Theme.accentLight}
            iconColor={Theme.accent}
          />

          <MiniInfoCard
            icon="account-balance-wallet"
            label="Investido"
            value={formatBRL(vehicle.totalInvested)}
            bg={Theme.surfaceMuted}
            iconColor={Theme.textSecondary}
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

        <ProfitResult profit={vehicle.profit} />
        <View style={styles.actions}>
          <View style={styles.actionItem}>
            <Button
              title="Adicionar despesa"
              onPress={() => router.push(`/vehicles/${vehicle.id}/expense`)}
            />
          </View>

          {!isSold ? (
            <View style={styles.actionItem}>
              <Button
                title="Marcar vendido"
                variant="success"
                onPress={() => router.push(`/vehicles/${vehicle.id}/sell`)}
              />
            </View>
          ) : null}
        </View>

        <Button
          title="Excluir veículo"
          loadingTitle="Excluindo..."
          variant="danger"
          loading={deleting}
          onPress={handleDeleteVehicle}
        />
      </Card>

      <Card>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionEyebrow}>CUSTOS</Text>
            <Text style={styles.sectionTitle}>Despesas</Text>
          </View>

          <Text style={styles.expenseCount}>{vehicle.expenses.length}</Text>
        </View>

        {vehicle.expenses.length === 0 ? (
          <EmptyState
            title="Nenhuma despesa cadastrada"
            message="Adicione os gastos deste veículo para acompanhar o investimento total."
            buttonTitle="Adicionar despesa"
            onPress={() => router.push(`/vehicles/${vehicle.id}/expense`)}
          />
        ) : (
          <View style={styles.expenseList}>
            {vehicle.expenses.map((expense) => (
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
            ))}
          </View>
        )}
      </Card>

      <Button title="Voltar" onPress={() => router.back()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.xl,
    gap: Spacing.md,
    backgroundColor: Theme.background,
  },
  actions: {
    flexDirection: "row",
    gap: Spacing.md,
  },

  actionItem: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  sectionEyebrow: {
    color: Theme.accent,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },

  sectionTitle: {
    color: Theme.textPrimary,
    fontSize: 19,
    fontWeight: "800",
    marginTop: Spacing.xs,
  },

  expenseCount: {
    minWidth: 34,
    height: 34,
    borderRadius: Radius.full,
    backgroundColor: Theme.accentLight,
    color: Theme.accentDark,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 14,
    fontWeight: "900",
  },

  expenseList: {
    gap: Spacing.md,
  },
  infoRow: {
    flexDirection: "row",
    gap: Spacing.md,
  },
});
