import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { formatBRL, formatDate } from "@/src/utils/formatters";
import { Radius } from "@/src/styles/radius";
import { Spacing } from "@/src/styles/spacing";
import { Theme } from "@/src/styles/theme";

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
  const description = note?.trim() || "Despesa sem descrição";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.info}>
          <View style={styles.iconContainer}>
            <MaterialIcons
              name="receipt-long"
              size={20}
              color={Theme.dangerDark}
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.date}>{formatDate(createdAt)}</Text>
          </View>
        </View>

        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Valor</Text>
          <Text style={styles.amount}>{formatBRL(amount)}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.actions}>
        <Pressable
          onPress={onEdit}
          style={({ pressed }) => [
            styles.actionButton,
            styles.editButton,
            pressed && styles.pressed,
          ]}
        >
          <MaterialIcons name="edit" size={18} color={Theme.textPrimary} />

          <Text style={styles.editButtonText}>Editar</Text>
        </Pressable>

        <Pressable
          onPress={onDelete}
          disabled={deleting}
          style={({ pressed }) => [
            styles.actionButton,
            styles.deleteButton,
            (pressed || deleting) && styles.disabled,
          ]}
        >
          <MaterialIcons
            name="delete-outline"
            size={18}
            color={Theme.dangerDark}
          />

          <Text style={styles.deleteButtonText}>
            {deleting ? "Excluindo..." : "Excluir"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.surfaceMuted,
    borderWidth: 1,
    borderColor: Theme.border,
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
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    flex: 1,
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: Theme.dangerLight,
    alignItems: "center",
    justifyContent: "center",
  },

  textContainer: {
    flex: 1,
  },

  description: {
    color: Theme.textPrimary,
    fontSize: 15,
    fontWeight: "800",
  },

  date: {
    color: Theme.textSecondary,
    fontSize: 12,
    marginTop: Spacing.xs,
  },

  amountContainer: {
    alignItems: "flex-end",
  },

  amountLabel: {
    color: Theme.textMuted,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },

  amount: {
    color: Theme.dangerDark,
    fontSize: 16,
    fontWeight: "900",
    marginTop: Spacing.xs,
  },

  divider: {
    height: 1,
    backgroundColor: Theme.border,
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
  },

  editButton: {
    backgroundColor: Theme.surface,
    borderWidth: 1,
    borderColor: Theme.border,
  },

  editButtonText: {
    color: Theme.textPrimary,
    fontWeight: "800",
  },

  deleteButton: {
    backgroundColor: Theme.dangerLight,
    borderWidth: 1,
    borderColor: Theme.dangerBorder,
  },

  deleteButtonText: {
    color: Theme.dangerDark,
    fontWeight: "800",
  },

  pressed: {
    opacity: 0.72,
  },

  disabled: {
    opacity: 0.55,
  },
});
