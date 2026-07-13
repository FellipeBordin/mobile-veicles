import { Pressable, Text } from "react-native";
import { Spacing } from "../../styles/spacing";
import { Radius } from "../../styles/radius";
import { Theme } from "../../styles/theme";
import { Colors } from "../../styles/colors";

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
  const backgroundColors = {
    primary: Theme.primary,
    success: Theme.success,
    danger: Theme.danger,
  };

  const backgroundColor = backgroundColors[variant];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={{
        marginTop: Spacing.xs,
        backgroundColor,
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.lg,
        borderRadius: Radius.lg,
        opacity: disabled || loading ? 0.6 : 1,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: Colors.white,
          fontWeight: "800",
        }}
      >
        {loading ? (loadingTitle ?? "Carregando...") : title}
      </Text>
    </Pressable>
  );
}
