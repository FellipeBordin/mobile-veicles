import { apiFetch } from "../lib/api";

export async function deleteExpenseById(id: string) {
  return apiFetch(`/api/expenses/${id}`, {
    method: "DELETE",
  });
}

export async function getExpenseById(id: string) {
  return apiFetch(`/api/expenses/${id}`);
}

export async function updateExpenseById(
  id: string,
  payload: {
    note: string;
    amount: number;
  },
) {
  return apiFetch(`/api/expenses/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

type ExpensePayload = {
  note: string;
  amount: number;
};

export async function createExpenseByVehicleId(
  vehicleId: string,
  payload: ExpensePayload,
) {
  return apiFetch(`/api/vehicles/${vehicleId}/expenses`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
