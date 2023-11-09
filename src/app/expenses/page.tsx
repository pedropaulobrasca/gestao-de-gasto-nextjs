import { auth } from "@clerk/nextjs";
import { ExpenseColumns } from "./columns";
import ExpensesDataTable from "./data-table";
import NewExpense from "@/components/new-expense";

export default async function Expenses() {
  const { userId } = await auth();
  return (
    <div className="container mx-auto flex flex-col py-10">
      <NewExpense userClertId={userId as string} />
      <ExpensesDataTable columns={ExpenseColumns} data={[]} />
    </div>
  );
}
