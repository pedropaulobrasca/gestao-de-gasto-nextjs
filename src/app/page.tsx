import Link from "next/link";
import { redirect } from "next/navigation";
import { LogIn, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-5xl font-bold text-zinc-900">Simple Expenses</h1>
      </div>

      <p className="mt-5 max-w-xl text-lg text-zinc-700">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt
        doloribus exercitationem laboriosam ipsam eaque provident sed,
        architecto.
      </p>

      <div className="mt-5 flex gap-5">
        <Link href="/dashboard">
          <Button variant={"secondary"}>
            Sign In <LogIn className="ml-2 h-4" />
          </Button>
        </Link>

        <Link href="/sign-up">
          <Button>
            Sign Up <Plus className="ml-2 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
