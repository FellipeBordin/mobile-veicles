export function parseExpenseAmount(value: string): number {
  const normalized = value.trim().replace(/\./g, "").replace(",", ".");

  return Number(normalized);
}

export function buildExpensePayload(note: string, amount: string) {
  return {
    note: note.trim(),

    amount: parseExpenseAmount(amount),
  };
}
