import { Text, View } from "react-native";

type InfoRow = {
  label: string;
  value: string;
};

type InfoBlockProps = {
  title: string;
  rows: InfoRow[];
};

export function InfoBlock({ title, rows }: InfoBlockProps) {
  return (
    <View
      style={{
        backgroundColor: "#f9fafb",
        borderRadius: 16,
        padding: 14,
        gap: 8,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "800", color: "#111" }}>
        {title}
      </Text>

      {rows.map((row) => (
        <View
          key={row.label}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <Text style={{ color: "#444", flex: 1 }}>{row.label}</Text>

          <Text
            style={{
              fontWeight: "700",
              color: "#111",
              flex: 1,
              textAlign: "right",
            }}
          >
            {row.value}
          </Text>
        </View>
      ))}
    </View>
  );
}
