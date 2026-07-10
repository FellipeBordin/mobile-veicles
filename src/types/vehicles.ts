export type Expense = {
  id: string;
  amount: number;
  note?: string | null;
  createdAt: string;
};

export type Vehicle = {
  id: string;
  name: string;
  plate: string;
  status: "IN_STOCK" | "SOLD";
  purchasePrice: number;
  purchaseDate?: string | null;
  previousOwnerName?: string | null;
  previousOwnerPhone?: string | null;
  soldPrice?: number | null;
  soldDate?: string | null;
  buyerName?: string | null;
  buyerPhone?: string | null;
  totalExpenses: number;
  totalInvested: number;
  profit?: number | null;
  createdAt: string;
  expenses: Expense[];
};
