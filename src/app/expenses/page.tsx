import { auth } from "@clerk/nextjs";
import { ExpenseColumns } from "./columns";
import ExpensesDataTable from "./data-table";
import NewExpense from "@/components/new-expense";
import axios from "axios";

async function getData() {
  const { userId } = await auth();
  const { data } = await axios.get(
    `http://localhost:3333/expense?userClerkId=${userId}`,
  );

  return data;
}

export default async function Expenses() {
  const { userId } = await auth();

  const expenses = await getData();
  return (
    <div className="container mx-auto flex flex-col py-10">
      <NewExpense userClertId={userId as string} />
      <ExpensesDataTable columns={ExpenseColumns} data={expenses.expenses} />
    </div>
  );
}
