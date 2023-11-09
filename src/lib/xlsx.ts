import xlsx, { IJsonSheet } from "json-as-xlsx";

export function exportToExcel() {
  let columns: IJsonSheet[] = [
    {
      sheet: "Expenses",
      columns: [
        { label: "ID", value: "id" },
        { label: "Paid", value: "paid" },
        { label: "Expense", value: "expense" },
        { label: "Monthly Value", value: "monthlyValue" },
        { label: "Date", value: "date" },
        { label: "Installments", value: "installments" },
        { label: "Total Value", value: "totalValue" },
        { label: "Description", value: "description" },
      ],
      content: [],
    },
  ];

  let settings = {
    fileName: "Expenses",
  };

  xlsx(columns, settings);
}
