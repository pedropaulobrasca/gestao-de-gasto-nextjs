import { db } from "@/lib/db";
import { expenses } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

type Expense = typeof expenses.$inferInsert;

// /api/create-expense
export async function POST(req: Request, res: Response) {
  try {
    const { userId } = await auth();
    const body = await req.json();

    const {
      paid,
      expense,
      monthlyValue,
      date,
      installments,
      totalValue,
      description,
    } = body;
    
    return NextResponse.json(
      { message: "Expense created successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
