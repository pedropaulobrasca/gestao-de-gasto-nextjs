import { DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface Props {
  expenses: {
    monthlyValue: number;
    totalValue: number;
    payable: number;
  };
}

export default function DashboardCards({ expenses }: Props) {
  // format value to currency br
  const formattedMonthlyValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(expenses.monthlyValue);

  const formattedTotalValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(expenses.totalValue);

  const formatedPayableValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(expenses.payable);

  return (
    <div className="flex gap-6 items-center justify-center mt-3">
      <Card className="w-[400px]">
        <CardHeader className="flex flex-row items-center justify-around">
          <CardTitle className="mt-[6px]">This Month Value</CardTitle>
          <DollarSign className="text-zinc-500" />
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <p className="text-4xl font-bold">{formattedMonthlyValue}</p>
        </CardContent>
      </Card>

      <Card className="w-[400px]">
        <CardHeader className="flex flex-row items-center justify-around">
          <CardTitle className="mt-[6px]">Total Value</CardTitle>
          <DollarSign className="text-zinc-500" />
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <p className="text-4xl font-bold">{formattedTotalValue}</p>
        </CardContent>
      </Card>

      <Card className="w-[400px]">
        <CardHeader className="flex flex-row items-center justify-around">
          <CardTitle className="mt-[6px]">Payable</CardTitle>
          <DollarSign className="text-zinc-500" />
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <p className="text-4xl font-bold">{formatedPayableValue}</p>
        </CardContent>
      </Card>
    </div>
  );
}
