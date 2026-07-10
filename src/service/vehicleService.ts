import { apiFetch } from "@/src/lib/api";

export async function getVehicleById(id: string) {
  return apiFetch(`/api/vehicles/${id}`);
}

export async function deleteVehicleById(id: string) {
  return apiFetch(`/api/vehicles/${id}`, {
    method: "DELETE",
  });
}

export async function getVehicles() {
  return apiFetch("/api/vehicles");
}

export async function claimLegacyVehicles() {
  return apiFetch("/api/auth/claim-legacy", {
    method: "POST",
  });
}
