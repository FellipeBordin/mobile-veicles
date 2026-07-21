import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/src/contexts/ThemeContexte";
import { Radius } from "@/src/styles/radius";
import { Spacing } from "@/src/styles/spacing";

type VehicleHeaderProps = {
  name: string;
  plate: string;
  isSold: boolean;
};

export function VehicleHeader({ name, plate, isSold }: VehicleHeaderProps) {
  const { theme } = useAppTheme();

  const statusBackground = isSold ? theme.successLight : theme.accentLight;

  const statusColor = isSold ? theme.successDark : theme.accentDark;

  return (
    <View style={styles.container}>
      <View style={styles.vehicleInfo}>
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: statusBackground,
            },
          ]}
        >
          <MaterialIcons name="directions-car" size={28} color={statusColor} />
        </View>

        <View style={styles.textContainer}>
          <Text
            style={[
              styles.name,
              {
                color: theme.textPrimary,
              },
            ]}
            numberOfLines={1}
          >
            {name}
          </Text>

          <View style={styles.plateContainer}>
            <MaterialIcons
              name="confirmation-number"
              size={15}
              color={theme.textMuted}
            />

            <Text
              style={[
                styles.plate,
                {
                  color: theme.textSecondary,
                },
              ]}
            >
              {plate}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={[
          styles.statusBadge,
          {
            backgroundColor: statusBackground,
          },
        ]}
      >
        <View
          style={[
            styles.statusDot,
            {
              backgroundColor: statusColor,
            },
          ]}
        />

        <Text
          style={[
            styles.statusText,
            {
              color: statusColor,
            },
          ]}
        >
          {isSold ? "Vendido" : "Em estoque"}
        </Text>
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
  },

  vehicleInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },

  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: Radius.lg,
    alignItems: "center",
    justifyContent: "center",
  },

  textContainer: {
    flex: 1,
  },

  name: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "900",
  },

  plateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    marginTop: Spacing.xs,
  },

  plate: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.4,
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    paddingVertical: 7,
    paddingHorizontal: Spacing.sm,
    borderRadius: Radius.full,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: Radius.full,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "800",
  },
});
