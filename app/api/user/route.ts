import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import * as z from "zod";
const userSchema = z
  .object({
    // username: z.string().min(1, "Username is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have more than 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is requried"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password not matched! Try again...",
  });
export async function POST(request: Request) {
  console.log("Post.", request.json());
  try {
    const body = await request.json();
    const { email, password } = userSchema.parse(body); //for validation
    console.log("email to register:::", email, password);
    const exsistingUser = await db.user.findUnique({
      where: { email: email },
    });
    if (exsistingUser) {
      return NextResponse.json(
        { user: null, message: "User with this email already exists" },
        { status: 409 }
      );
    }
    console.log(email, password);
    const hashedPassword = await hash(password, 10);
    const response = await db.user.create({
      data: {
        email: email as string,
        password: hashedPassword,
      },
    });
    return NextResponse.json(
      { user: response, message: "User created succesfully" },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Register::Something went wrong!" },
      { status: 500 }
    );
  }
}
