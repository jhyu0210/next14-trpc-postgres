// import { Button } from "@/components/ui/button";
// import { FormEvent } from "react";
import { getServerSession } from "next-auth";
import Form from "./SigninForm";
import { redirect } from "next/navigation";
import Link from "next/link";
import SigninForm from "./SigninForm";

const Login = async () => {
  const session = await getServerSession();
  if (session) redirect("/");
  return (
    <div className="mt-32 w-[80%] mx-auto max-w-screen-sm">
      <SigninForm />
    </div>
  );
};

export default Login;
