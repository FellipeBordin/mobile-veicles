import { ReactNode } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppTheme } from "@/src/contexts/ThemeContexte";
import { Spacing } from "@/src/styles/spacing";

type ScreenContainerProps = {
  children: ReactNode;
  scroll?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export function ScreenContainer({
  children,
  scroll = false,
  contentContainerStyle,
}: ScreenContainerProps) {
  const { theme } = useAppTheme();

  if (scroll) {
    return (
      <SafeAreaView
        style={[
          styles.safeArea,
          {
            backgroundColor: theme.background,
          },
        ]}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            {
              backgroundColor: theme.background,
            },
            contentContainerStyle,
          ]}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.background,
          },
          contentContainerStyle,
        ]}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxl,
    gap: Spacing.md,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.xl,
    gap: Spacing.md,
  },
});