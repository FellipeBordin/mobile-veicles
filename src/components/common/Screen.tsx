import { ReactNode } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { Theme } from "@/src/styles/theme";
import { Spacing } from "@/src/styles/spacing";

type ScreenProps = {
  children: ReactNode;
};

export function Screen({ children }: ScreenProps) {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,

    backgroundColor: Theme.background,

    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.xl,

    gap: Spacing.md,
  },
});
