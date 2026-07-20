import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useColorScheme } from "react-native";

import {
  DarkTheme,
  LightTheme,
} from "@/src/styles/theme";

type ThemeMode = "light" | "dark" | "system";

type ThemeContextData = {
  theme: typeof DarkTheme | typeof LightTheme;
  mode: ThemeMode;
  isDark: boolean;
  setMode: (mode: ThemeMode) => Promise<void>;
  toggleTheme: () => Promise<void>;
};

const STORAGE_KEY = "@vehicle-control/theme";

const ThemeContext = createContext<ThemeContextData | null>(null);

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const systemTheme = useColorScheme();

  const [mode, setModeState] =
    useState<ThemeMode>("system");

  useEffect(() => {
    async function load() {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);

      if (
        saved === "light" ||
        saved === "dark" ||
        saved === "system"
      ) {
        setModeState(saved);
      }
    }

    load();
  }, []);

  const isDark =
    mode === "dark" ||
    (mode === "system" && systemTheme === "dark");

  const theme = isDark ? DarkTheme : LightTheme;

  async function setMode(mode: ThemeMode) {
    setModeState(mode);
    await AsyncStorage.setItem(STORAGE_KEY, mode);
  }

  async function toggleTheme() {
    await setMode(isDark ? "light" : "dark");
  }

  const value = useMemo(
    () => ({
      theme,
      mode,
      isDark,
      setMode,
      toggleTheme,
    }),
    [theme, mode, isDark]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useAppTheme must be used inside ThemeProvider"
    );
  }

  return context;
}