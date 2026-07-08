export function getProfitStyle(profit?: number | null) {
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
