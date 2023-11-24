import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/", //middleware to reirect to login page not default next-auth signin page
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials, req) {
        console.log("is authorizing?");
        // const response = await sql`
        // SELECT * FROM users WHERE email=${credentials?.email}
        // `;
        const user = await db.user.findUnique({
          where: { email: credentials?.email },
        });

        console.log(user?.email);
        if (!user) {
          return null;
        }
        const passwordCorrect = await compare(
          credentials?.password || "",
          user.password
        );
        // console.log("passwordCorrect::::", passwordCorrect);
        if (!passwordCorrect) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
        };
        // return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      return token;
    },
    async session({ session, token }) {
      // console.log("authOptions callback jwt, token::", token);
      //   console.log("authOptions callback jwt, session::", session);
      return session;
    },
  },
};
