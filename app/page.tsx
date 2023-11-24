import { buttonVariants } from "@/components/ui/button";
import { authOptions } from "@/lib/authOptions";
// import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  // const session = await getServerSession(authOptions);
  // console.log("server-session", session);
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl">Home</h1>
      <Link href="/dashboard" className={buttonVariants()}>
        Open My Dashboard Admin
      </Link>
    </main>
  );
}
