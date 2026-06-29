import { apiFetch } from "../lib/api";

export async function deleteExpenseById(id: string) {
  return apiFetch(`/api/expenses/${id}`, {
    method: "DELETE",
  });
}
