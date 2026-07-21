import { ReactNode } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { useAppTheme } from "@/src/contexts/ThemeContexte";
import { Spacing } from "@/src/styles/spacing";

type ScreenProps = {
  children: ReactNode;
};

export function Screen({ children }: ScreenProps) {
  const { theme } = useAppTheme();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.container,
        {
          backgroundColor: theme.surface,
        },
      ]}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,

    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.xl,

    gap: Spacing.md,
  },
});
