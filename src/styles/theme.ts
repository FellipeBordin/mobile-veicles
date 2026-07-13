import { Colors } from "./colors";

export const Theme = {
  background: Colors.slate100,

  surface: Colors.white,
  surfaceMuted: Colors.slate50,

  primary: Colors.slate900,
  primaryPressed: Colors.black,

  accent: Colors.blue600,
  accentDark: Colors.blue700,
  accentLight: Colors.blue100,

  textPrimary: Colors.slate900,
  textSecondary: Colors.slate500,
  textMuted: Colors.slate400,

  border: Colors.slate200,

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
