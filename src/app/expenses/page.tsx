import { ExpenseData } from "@/expenses";

import { ExpenseColumns } from "./columns";
import ExpensesDataTable from "./data-table";

export default function Expenses() {
  return (
    <div className="container py-10 mx-auto">
      <ExpensesDataTable columns={ExpenseColumns} data={ExpenseData} />
    </div>
  );
}
