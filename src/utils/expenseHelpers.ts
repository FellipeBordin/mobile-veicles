import { parseCurrency } from "./parsers";

export function buildExpensePayload(note: string, amount: string) {
  return {
    note: note.trim(),
    amount: parseCurrency(amount),
  };
}