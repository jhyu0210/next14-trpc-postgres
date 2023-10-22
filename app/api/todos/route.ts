import { prisma } from "@/app/db";
import { Todo } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const todos = await prisma?.todo.findMany();
  return NextResponse.json(todos);
}
// export async function PUT(req: Request) {
//   const todo = await req.url.
//   const todos = await prisma?.todo.update({where:
//     id: todo.id
//   });
//   return NextResponse.json(todos);
// }
