export function getProfitStyle(
  profit?: number | null,
  theme?:
    | {
        readonly background: "#0F172A";
        readonly surface: "#1E293B";
        readonly surfaceMuted: "#334155";
        readonly surfaceStrong: "#475569";
        readonly border: "#334155";
        readonly divider: "#334155";
        readonly textPrimary: "#FFFFFF";
        readonly textSecondary: "#CBD5E1";
        readonly textMuted: "#94A3B8";
        readonly textInverse: "#0F172A";
        readonly primary: "#FFFFFF";
        readonly primaryPressed: "#E2E8F0";
        readonly accent: "#60A5FA";
        readonly accentDark: "#3B82F6";
        readonly accentLight: "#334155";
        readonly success: "#4ADE80";
        readonly successDark: "#22C55E";
        readonly successLight: "#334155";
        readonly danger: "#F87171";
        readonly dangerDark: "#EF4444";
        readonly dangerLight: "#334155";
        readonly dangerBorder: "#EF4444";
        readonly warning: "#FBBF24";
        readonly warningLight: "#334155";
        readonly shadow: "#000000";
      }
    | {
        readonly background: "#F4F7FB";
        readonly surface: "#FFFFFF";
        readonly surfaceMuted: "#F8FAFC";
        readonly surfaceStrong: "#E2E8F0";
        readonly border: "#E2E8F0";
        readonly divider: "#E2E8F0";
        readonly textPrimary: "#0F172A";
        readonly textSecondary: "#64748B";
        readonly textMuted: "#94A3B8";
        readonly textInverse: "#FFFFFF";
        readonly primary: "#0F172A";
        readonly primaryPressed: "#000000";
        readonly accent: "#2563EB";
        readonly accentDark: "#1D4ED8";
        readonly accentLight: "#DBEAFE";
        readonly success: "#16A34A";
        readonly successDark: "#15803D";
        readonly successLight: "#DCFCE7";
        readonly danger: "#DC2626";
        readonly dangerDark: "#B91C1C";
        readonly dangerLight: "#FEE2E2";
        readonly dangerBorder: "#FECACA";
        readonly warning: "#D97706";
        readonly warningLight: "#FEF3C7";
        readonly shadow: "#000000";
      },
) {
  if (profit == null) {
    return {
      color: "#111",
      bg: "#f3f4f6",
    };
  }

  if (profit > 0) {
    return {
      color: "#0f766e",
      bg: "#ccfbf1",
    };
  }

  if (profit < 0) {
    return {
      color: "#b91c1c",
      bg: "#fee2e2",
    };
  }

  return {
    color: "#111",
    bg: "#f3f4f6",
  };
}
