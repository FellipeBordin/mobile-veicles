import { Vehicle } from "@/src/types/vehicles";

export function calculateVehicleSummary(vehicles: Vehicle[]) {
  const totalVehicles = vehicles.length;
  const inStockCount = vehicles.filter((v) => v.status === "IN_STOCK").length;
  const soldCount = vehicles.filter((v) => v.status === "SOLD").length;

  const totalInvested = vehicles.reduce((acc, v) => acc + v.totalInvested, 0);
  const totalProfit = vehicles.reduce((acc, v) => acc + (v.profit ?? 0), 0);

  return {
    totalVehicles,
    inStockCount,
    soldCount,
    totalInvested,
    totalProfit,
  };
}
