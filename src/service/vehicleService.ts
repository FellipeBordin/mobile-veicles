import { apiFetch } from "@/src/lib/api";

type SellVehiclePayload = {
  soldPrice: number;
  buyerName: string;
  buyerPhone: string;
};
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
export async function sellVehicleById(
  vehicleId: string,
  payload: SellVehiclePayload,
) {
  return apiFetch(`/api/vehicles/${vehicleId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}
