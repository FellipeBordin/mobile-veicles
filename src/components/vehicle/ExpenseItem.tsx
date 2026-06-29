import { Pressable, Text, View } from "react-native";
import { formatBRL, formatDate } from "../../utils/formatters";

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
  return (
    <View
      style={{
        backgroundColor: "#f9fafb",
        borderWidth: 1,
        borderColor: "#e5e5e5",
        borderRadius: 14,
        padding: 12,
        gap: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Text
          style={{ flex: 1, fontSize: 15, fontWeight: "700", color: "#111" }}
        >
          {note?.trim() ? note : "Despesa sem descrição"}
        </Text>

        <Text style={{ fontSize: 15, fontWeight: "800", color: "#b91c1c" }}>
          {formatBRL(amount)}
        </Text>
      </View>

      <Text style={{ fontSize: 12, color: "#666" }}>
        {formatDate(createdAt)}
      </Text>

      <View style={{ flexDirection: "row", gap: 10 }}>
        <Pressable
          onPress={onEdit}
          style={{
            flex: 1,
            backgroundColor: "#111",
            paddingVertical: 10,
            borderRadius: 12,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "700" }}>Editar</Text>
        </Pressable>

        <Pressable
          onPress={onDelete}
          disabled={deleting}
          style={{
            flex: 1,
            backgroundColor: "#dc2626",
            paddingVertical: 10,
            borderRadius: 12,
            alignItems: "center",
            opacity: deleting ? 0.6 : 1,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "700" }}>
            {deleting ? "Excluindo..." : "Excluir"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
