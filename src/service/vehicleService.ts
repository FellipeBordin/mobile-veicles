import { apiFetch } from "../lib/api";

export async function getVehicleById(id: string) {
  return apiFetch(`/api/vehicles/${id}`);
}

export async function deleteVehicleById(id: string) {
  return apiFetch(`/api/vehicles/${id}`, {
    method: "DELETE",
  });
}
