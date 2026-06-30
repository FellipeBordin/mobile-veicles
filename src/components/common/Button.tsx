import { Pressable, Text } from "react-native";

type ButtonProps = {
  title: string;
  loadingTitle?: string;
  loading?: boolean;
  disabled?: boolean;
  onPress: () => void;
  variant?: "primary" | "danger" | "success";
};

export function Button({
  title,
  loadingTitle,
  loading = false,
  disabled = false,
  onPress,
  variant = "primary",
}: ButtonProps) {
  const backgroundColor =
    variant === "danger"
      ? "#dc2626"
      : variant === "success"
        ? "#16a34a"
        : "#111";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={{
        marginTop: 4,
        backgroundColor,
        paddingVertical: 12,
        borderRadius: 14,
        opacity: disabled || loading ? 0.6 : 1,
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "800" }}>
        {loading ? (loadingTitle ?? "Carregando...") : title}
      </Text>
    </Pressable>
  );
}
