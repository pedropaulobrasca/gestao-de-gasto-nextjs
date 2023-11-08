import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// /api/create-expense
export async function GET(req: Request, res: Response) {
  try {
    const { userId } = await auth();

    const expenses = await prisma.expense.findMany({
      where: {
        userClerkId: userId!,
      },
    });

    return NextResponse.json({ expenses }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
