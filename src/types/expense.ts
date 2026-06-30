export type ExpenseDTO = {
  id: string;
  vehicleId: string;
  amount: number;
  note?: string | null;
  createdAt: string;
};
