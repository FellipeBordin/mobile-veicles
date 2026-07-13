import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { Radius } from "@/src/styles/radius";
import { Spacing } from "@/src/styles/spacing";
import { Theme } from "@/src/styles/theme";

type ErrorStateProps = {
  message: string;
};

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <MaterialIcons name="error-outline" size={22} color={Theme.dangerDark} />

      <View style={styles.textContainer}>
        <Text style={styles.title}>Não foi possível carregar</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.md,
    backgroundColor: Theme.dangerLight,
    borderWidth: 1,
    borderColor: Theme.dangerBorder,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginTop: Spacing.md,
  },

  textContainer: {
    flex: 1,
  },

  title: {
    color: Theme.dangerDark,
    fontSize: 14,
    fontWeight: "800",
  },

  message: {
    color: Theme.dangerDark,
    fontSize: 13,
    lineHeight: 18,
    marginTop: Spacing.xs,
  },
});
