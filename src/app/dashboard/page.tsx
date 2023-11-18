import { ExpenseColumns } from "./columns";
import ExpensesDataTable from "./data-table";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/theme-toggle";

import DashboardCards from "@/components/dashboard-cards";

async function getData() {
  try {
    const userId = 1;
    const { data } = await axios.get(
      `http://localhost:3333/expense?userClerkId=${userId}`,
    );

    return data;
  } catch (error) {
    return [];
  }
}

export default async function Dashboard() {
  const { expenses } = await getData();

  return (
    <div className="container mx-auto flex flex-col py-10">
      <nav className="mb-6 flex items-center justify-between">
        <ModeToggle />
      </nav>

      <Separator />

      <Tabs defaultValue="expenses" className="mt-6">
        <TabsList>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          {/* <TabsTrigger value="dashboard">Dashboard</TabsTrigger> */}
        </TabsList>
        <TabsContent value="expenses">
          <DashboardCards expenses={expenses} />

          <ExpensesDataTable
            columns={ExpenseColumns}
            data={expenses.expenses}
            userClerkId={"123aass"}
          />
        </TabsContent>
        <TabsContent value="dashboard">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}
