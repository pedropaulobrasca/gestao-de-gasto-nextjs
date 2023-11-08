import { ExpenseData } from "@/expenses";

import { ExpenseColumns } from "./columns";
import ExpensesDataTable from "./data-table";
import NewExpense from "@/components/new-expense";

export default function Expenses() {
  return (
    <div className="container mx-auto flex flex-col py-10">
      <NewExpense />
      <ExpensesDataTable columns={ExpenseColumns} data={ExpenseData} />
    </div>
  );
}
