import { ExpenseData } from "@/expenses";

import { ExpenseColumns } from "./columns";
import ExpensesDataTable from "./data-table";

export default function Expenses() {
  return (
    <div className="container mx-auto py-10">
      <ExpensesDataTable columns={ExpenseColumns} data={ExpenseData} />
    </div>
  );
}
