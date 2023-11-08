import { NextResponse } from "next/server";

// /api/create-expense
export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const {
      paid,
      expense,
      monthlyValue,
      date,
      installments,
      totalValue,
      description,
      userId,
    } = body;

    
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

// paid: false,
// expense: "Paper Towel Touchless",
// monthlyValue: 55,
// date: "3/28/2023",
// installments: 1,
// totalValue: 65,
// description:
//   "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
// userId: "0290542c-4954-4e87-aa8b-b300d9089a2c",
