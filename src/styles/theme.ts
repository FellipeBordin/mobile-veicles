import { Colors } from "./colors";

export const LightTheme = {
  background: Colors.slate100,

  surface: Colors.white,
  surfaceMuted: Colors.slate50,
  surfaceStrong: Colors.slate200,

  border: Colors.slate200,
  divider: Colors.slate200,

  textPrimary: Colors.slate900,
  textSecondary: Colors.slate500,
  textMuted: Colors.slate400,
  textInverse: Colors.white,

  primary: Colors.slate900,
  primaryPressed: Colors.black,

  accent: Colors.blue600,
  accentDark: Colors.blue700,
  accentLight: Colors.blue100,

  success: Colors.green600,
  successDark: Colors.green700,
  successLight: Colors.green100,

  danger: Colors.red600,
  dangerDark: Colors.red700,
  dangerLight: Colors.red100,
  dangerBorder: Colors.red200,

  warning: Colors.amber600,
  warningLight: Colors.amber100,

  shadow: Colors.black,
} as const;

export const DarkTheme = {
  background: Colors.slate900,

  surface: Colors.slate800,
  surfaceMuted: Colors.slate700,
  surfaceStrong: Colors.slate600,

  border: Colors.slate700,
  divider: Colors.slate700,

  textPrimary: Colors.white,
  textSecondary: Colors.slate300,
  textMuted: Colors.slate400,
  textInverse: Colors.slate900,

  primary: Colors.white,
  primaryPressed: Colors.slate200,

  accent: Colors.blue400,
  accentDark: Colors.blue500,
  accentLight: Colors.slate700,

  success: Colors.green400,
  successDark: Colors.green500,
  successLight: Colors.slate700,

  danger: Colors.red400,
  dangerDark: Colors.red500,
  dangerLight: Colors.slate700,
  dangerBorder: Colors.red500,

  warning: Colors.amber400,
  warningLight: Colors.slate700,

  shadow: Colors.black,
} as const;

export type AppTheme = typeof LightTheme;

export const Theme = LightTheme;