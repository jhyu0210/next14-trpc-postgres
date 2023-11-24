// import { Button } from "@/components/ui/button";
// import { FormEvent } from "react";
import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";
import SignupForm from "./SignupForm";

const Register = async () => {
  const session = await getServerSession();
  if (session) redirect("/");
  return (
    <div className="mt-32 w-[80%] mx-auto max-w-screen-sm">
      <SignupForm />
    </div>
  );
};

export default Register;
