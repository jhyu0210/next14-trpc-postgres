// import { Button } from "@/components/ui/button";
// import { FormEvent } from "react";
import Form from "./form";

const Register = () => {
  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);
  //   const res = await fetch(`/api/auth/register`, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       email: formData.get("email"),
  //       password: formData.get("password"),
  //     }),
  //   });
  //   console.log({ res });
  // };
  return (
    <div className="mt-32">
      <Form />
    </div>
  );
};

export default Register;
