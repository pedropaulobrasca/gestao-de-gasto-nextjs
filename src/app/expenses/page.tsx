import { UserButton, auth } from "@clerk/nextjs";
import { ExpenseColumns } from "./columns";
import ExpensesDataTable from "./data-table";
import NewExpense from "@/components/new-expense";
import axios from "axios";

async function getData() {
  try {
    const { userId } = await auth();
    const { data } = await axios.get(
      `http://localhost:3333/expense?userClerkId=${userId}`,
    );

    console.log(data);

    return data;
  } catch (error) {
    return [];
  }
}

export default async function Expenses() {
  const { userId } = await auth();

  const {expenses, totalValue, monthlyValue} = await getData();
  return (
    <div className="container mx-auto flex flex-col py-10">
      <UserButton afterSignOutUrl="/" />

      <ExpensesDataTable
        columns={ExpenseColumns}
        data={expenses.expenses}
        userClerkId={userId as string}
      />
    </div>
  );
}
