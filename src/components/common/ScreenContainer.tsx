import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { Spacing } from "@/src/styles/spacing";
import { Theme } from "@/src/styles/theme";

type ScreenContainerProps = {
  children: ReactNode;
};

export function ScreenContainer({ children }: ScreenContainerProps) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.background,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxl,
  },
});
