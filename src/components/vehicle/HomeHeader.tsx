import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Radius } from "@/src/styles/radius";
import { Spacing } from "@/src/styles/spacing";
import { Theme } from "@/src/styles/theme";

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
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.eyebrow}>
          {userName ? `Olá, ${userName}` : "Gestão de veículos"}
        </Text>

        <Text style={styles.title}>Veículos</Text>

        <Text style={styles.subtitle}>
          Controle de compra, despesas, venda e resultado.
        </Text>
      </View>

      <View style={styles.actions}>
        <Pressable
          onPress={onNewVehicle}
          style={({ pressed }) => [
            styles.iconButton,
            styles.newButton,
            pressed && styles.pressed,
          ]}
        >
          <MaterialIcons name="add" size={22} color={Theme.surface} />
        </Pressable>

        <Pressable
          onPress={onLogout}
          style={({ pressed }) => [
            styles.iconButton,
            styles.logoutButton,
            pressed && styles.pressed,
          ]}
        >
          <MaterialIcons name="logout" size={21} color={Theme.dangerDark} />
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
    color: Theme.accent,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: Spacing.xs,
  },

  title: {
    color: Theme.textPrimary,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "800",
  },

  subtitle: {
    color: Theme.textSecondary,
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
  },

  newButton: {
    backgroundColor: Theme.primary,
  },

  logoutButton: {
    backgroundColor: Theme.dangerLight,
    borderWidth: 1,
    borderColor: Theme.dangerBorder,
  },

  pressed: {
    opacity: 0.72,
    transform: [{ scale: 0.97 }],
  },
});
