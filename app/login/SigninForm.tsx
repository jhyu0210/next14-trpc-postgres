// "use client";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// // import { Button } from "@/components/ui/button";
// import React, { FormEvent } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// const Form = () => {
//   const router = useRouter();
//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const loginFormData = new FormData(e.currentTarget);
//     const response = await signIn("credentials", {
//       email: loginFormData.get("email"),
//       password: loginFormData.get("password"),
//       redirect: false,
//     });
//     if (!response?.error) {
//       // Todo toast message try again...
//       router.push("/");
//       router.refresh();
//     }
//   };
//   // console.log({ res });

//   return (
//     <>
//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-col gap-2 mx-auto max-w-md mt-10"
//       >
//         <h2>Login Form</h2>
//         <Input type="email" name="email" placeholder="Email" className="" />
//         <Input
//           type="password"
//           name="password"
//           placeholder="password"
//           className=""
//         />
//         <Button type="submit">Login</Button>
//         <div className="border border-slate-400 mt-4 text-center">
//           <p>You do not have an account yet?</p>
//           <Link href="/register">Register</Link>
//         </div>
//       </form>
//     </>
//   );
// };

// export default Form;

"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
import React, { FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Link2Icon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const FormSchema = z.object({
  // username: z.string().min(1, "Username is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have more than 8 characters"),
  // confirmPassword: z.string().min(1, "Password confirmation is requried"),
});
// .refine((data) => data.password === data.confirmPassword, {
//   path: ["confirmPassword"],
//   message: "Password not matched! Try again...",
// });

const SigninForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    // const formData = new FormData(e.currentTarget);
    // const res = await fetch(`/api/auth/register`, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     email: formData.get("email"),
    //     password: formData.get("password"),
    //   }),
    // });
    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false, // cause error! not to go home...
    });
    console.log(signInData);
    if (signInData?.error) {
      console.log("login error::", signInData.error);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
        // action: <ToastAction altText="Invalid Credentials">X</ToastAction>,
      });
    } else {
      router.push("/");
      router.refresh(); //router state refresh
    }
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <h2 className="font-bold text-center">Login Form</h2>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="mail@mail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <Input type="email" name="email" placeholder="Email" className="" />
          <Input
            type="password"
            name="password"
            placeholder="password"
            className=""
            /> */}
            <Button className="w-full mt-8">Login</Button>
            <p className="text-sm mt-2 text-sky-400">
              No Account for us? Please make an account
              <Link href="/register" className="ml-4 border-b border-slate-300">
                <span className="font-bold text-sky-800">here!</span>
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </>
  );
};

export default SigninForm;
