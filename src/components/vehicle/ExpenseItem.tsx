import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/src/contexts/ThemeContexte";
import { Radius } from "@/src/styles/radius";
import { Spacing } from "@/src/styles/spacing";
import { formatBRL, formatDate } from "@/src/utils/formatters";

type ExpenseItemProps = {
  note?: string | null;
  amount: number;
  createdAt: string;
  onEdit: () => void;
  onDelete: () => void;
  deleting: boolean;
};

export function ExpenseItem({
  note,
  amount,
  createdAt,
  onEdit,
  onDelete,
  deleting,
}: ExpenseItemProps) {
  const { theme } = useAppTheme();

  const description = note?.trim() || "Despesa sem descrição";

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.surfaceMuted,
          borderColor: theme.border,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.info}>
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: theme.dangerLight,
              },
            ]}
          >
            <MaterialIcons
              name="receipt-long"
              size={20}
              color={theme.dangerDark}
            />
          </View>

          <View style={styles.textContainer}>
            <Text
              style={[
                styles.description,
                {
                  color: theme.textPrimary,
                },
              ]}
            >
              {description}
            </Text>

            <Text
              style={[
                styles.date,
                {
                  color: theme.textSecondary,
                },
              ]}
            >
              {formatDate(createdAt)}
            </Text>
          </View>
        </View>

        <View style={styles.amountContainer}>
          <Text
            style={[
              styles.amountLabel,
              {
                color: theme.textMuted,
              },
            ]}
          >
            Valor
          </Text>

          <Text
            style={[
              styles.amount,
              {
                color: theme.dangerDark,
              },
            ]}
          >
            {formatBRL(amount)}
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.divider,
          {
            backgroundColor: theme.border,
          },
        ]}
      />

      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Editar despesa ${description}`}
          onPress={onEdit}
          style={({ pressed }) => [
            styles.actionButton,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
            },
            pressed && styles.pressed,
          ]}
        >
          <MaterialIcons name="edit" size={18} color={theme.textPrimary} />

          <Text
            style={[
              styles.actionButtonText,
              {
                color: theme.textPrimary,
              },
            ]}
          >
            Editar
          </Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Excluir despesa ${description}`}
          accessibilityState={{
            disabled: deleting,
            busy: deleting,
          }}
          onPress={onDelete}
          disabled={deleting}
          style={({ pressed }) => [
            styles.actionButton,
            {
              backgroundColor: theme.dangerLight,
              borderColor: theme.dangerBorder,
            },
            (pressed || deleting) && styles.disabled,
          ]}
        >
          <MaterialIcons
            name="delete-outline"
            size={18}
            color={theme.dangerDark}
          />

          <Text
            style={[
              styles.actionButtonText,
              {
                color: theme.dangerDark,
              },
            ]}
          >
            {deleting ? "Excluindo..." : "Excluir"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    gap: Spacing.md,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: Spacing.md,
  },

  info: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
  },

  textContainer: {
    flex: 1,
  },

  description: {
    fontSize: 15,
    fontWeight: "800",
  },

  date: {
    fontSize: 12,
    marginTop: Spacing.xs,
  },

  amountContainer: {
    alignItems: "flex-end",
  },

  amountLabel: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },

  amount: {
    fontSize: 16,
    fontWeight: "900",
    marginTop: Spacing.xs,
  },

  divider: {
    height: 1,
  },

  actions: {
    flexDirection: "row",
    gap: Spacing.sm,
  },

  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
    borderWidth: 1,
  },

  actionButtonText: {
    fontWeight: "800",
  },

  pressed: {
    opacity: 0.72,
  },

  disabled: {
    opacity: 0.55,
  },
});
