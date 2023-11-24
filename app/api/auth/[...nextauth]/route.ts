import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { compare } from "bcrypt";
// import { db } from "@/lib/db";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { authOptions } from "@/lib/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// export async function POST(request: Request) {
//   try {
//     const { email, password } = await request.json();
//     console.log({ email, password });
//     const hashedPassword = await hash(password, 10);
//     const response = await sql`
//     INSERT INTO users (email,password)
//     VALUES (${email},${hashedPassword})
//     `;
//   } catch (e) {
//     console.log({ e });
//   }
//   return NextResponse.json({ message: "success" });
// }
