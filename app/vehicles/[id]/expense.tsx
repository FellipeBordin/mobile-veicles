import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Button } from "@/src/components/common/Button";
import { Card } from "@/src/components/common/Card";
import { Input } from "@/src/components/common/Input";
import { ScreenContainer } from "@/src/components/common/ScreenContainer";
import { useAppTheme } from "@/src/contexts/ThemeContexte";
import { apiFetch } from "@/src/lib/api";
import { Radius } from "@/src/styles/radius";
import { Spacing } from "@/src/styles/spacing";
import { Typography } from "@/src/styles/typography";
import { showAlert } from "@/src/utils/alert";

export default function NewExpenseScreen() {
  const router = useRouter();
  const { theme } = useAppTheme();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  async function saveExpense() {
    const parsedAmount = Number(amount.replace(",", "."));

    const payload = {
      vehicleId: id,
      note: note.trim(),
      amount: parsedAmount,
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

  function handleCancel() {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/");
  }

  return (
    <ScreenContainer>
      <Card>
        <View style={styles.header}>
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: theme.accentLight,
              },
            ]}
          >
            <MaterialIcons name="receipt-long" size={28} color={theme.accent} />
          </View>

          <View style={styles.headerContent}>
            <Text
              style={[
                styles.title,
                {
                  color: theme.textPrimary,
                },
              ]}
            >
              Nova despesa
            </Text>

            <Text
              style={[
                styles.subtitle,
                {
                  color: theme.textSecondary,
                },
              ]}
            >
              Informe o que foi gasto e o valor
            </Text>
          </View>
        </View>

        <Input
          label="Descrição"
          value={note}
          onChangeText={setNote}
          placeholder="Ex: banco rasgado, pneu furado"
          icon="description"
        />

        <Input
          label="Valor gasto"
          value={amount}
          onChangeText={setAmount}
          placeholder="Digite o valor gasto"
          keyboardType="decimal-pad"
          icon="payments"
        />

        <View style={styles.actions}>
          <Button
            title="Salvar despesa"
            loadingTitle="Salvando..."
            icon="save"
            onPress={saveExpense}
            loading={loading}
          />

          <Button
            title="Cancelar"
            variant="ghost"
            onPress={handleCancel}
            disabled={loading}
          />
        </View>
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    marginBottom: Spacing.sm,
  },

  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: Radius.lg,
    alignItems: "center",
    justifyContent: "center",
  },

  headerContent: {
    flex: 1,
  },

  title: {
    ...Typography.screenTitle,
    fontSize: 24,
  },

  subtitle: {
    ...Typography.body,
    marginTop: Spacing.xs,
  },

  actions: {
    gap: Spacing.sm,
  },
});
