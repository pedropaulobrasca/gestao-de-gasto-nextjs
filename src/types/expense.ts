export type Expense = {
  id?: number;
  paid: boolean;
  expense: string;
  monthlyValue?: number;
  date?: Date;
  installments?: number;
  totalValue: number;
  description?: string;
  createdAt?: Date;
  userId?: string;
};

export interface IExpense {
  id?: number;
  paid: boolean;
  expense: string;
  monthlyValue?: number;
  date?: Date;
  installments?: number;
  totalValue: number;
  description?: string;
  createdAt?: Date;
  userId?: string;
}
