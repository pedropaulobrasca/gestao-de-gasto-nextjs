import { ExpenseColumns } from "./columns";
import ExpensesDataTable from "./data-table";
import NewExpense from "@/components/new-expense";

export async function getExpenses() {
  const data = await fetch("http://localhost:3000/api/get-expenses");

  console.log(data);

  return data.json();
}

export default function Expenses() {
  // const data = getExpenses();

  return (
    <div className="container mx-auto flex flex-col py-10">
      <NewExpense />
      <ExpensesDataTable columns={ExpenseColumns} data={[]} />
    </div>
  );
}
