import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/src/contexts/ThemeContexte";
import { Radius } from "@/src/styles/radius";
import { Spacing } from "@/src/styles/spacing";

type HomeHeaderProps = {
  userName: string;
  onNewVehicle: () => void;
  onLogout: () => void;
};

export function HomeHeader({
  userName,
  onNewVehicle,
  onLogout,
}: HomeHeaderProps) {
  const { theme } = useAppTheme();

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.eyebrow,
            {
              color: theme.accent,
            },
          ]}
        >
          {userName ? `Olá, ${userName}` : "Gestão de veículos"}
        </Text>

        <Text
          style={[
            styles.title,
            {
              color: theme.textPrimary,
            },
          ]}
        >
          Veículos
        </Text>

        <Text
          style={[
            styles.subtitle,
            {
              color: theme.textSecondary,
            },
          ]}
        >
          Controle de compra, despesas, venda e resultado.
        </Text>
      </View>

      <View style={styles.actions}>
        <Pressable
          onPress={onNewVehicle}
          style={({ pressed }) => [
            styles.iconButton,
            {
              backgroundColor: theme.primary,
            },
            pressed && styles.pressed,
          ]}
        >
          <MaterialIcons name="add" size={22} color={theme.surface} />
        </Pressable>

        <Pressable
          onPress={onLogout}
          style={({ pressed }) => [
            styles.iconButton,
            {
              backgroundColor: theme.dangerLight,
              borderColor: theme.dangerBorder,
            },
            pressed && styles.pressed,
          ]}
        >
          <MaterialIcons name="logout" size={21} color={theme.dangerDark} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: Spacing.md,
    paddingBottom: Spacing.lg,
  },

  textContainer: {
    flex: 1,
  },

  eyebrow: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: Spacing.xs,
  },

  title: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "800",
  },

  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: Spacing.xs,
    maxWidth: 280,
  },

  actions: {
    flexDirection: "row",
    gap: Spacing.sm,
  },

  iconButton: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "transparent",
  },

  pressed: {
    opacity: 0.72,
    transform: [{ scale: 0.97 }],
  },
});
