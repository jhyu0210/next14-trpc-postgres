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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";

const FormSchema = z
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

const SignupForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const test = JSON.stringify({
      email: values.email,
      password: values.password,
    }); //this.works
    // console.log(test);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({
      //   email: values.email,
      //   passowrd: values.password,
      //   // email: values.get("email"),
      //   // password: formData.get("password"),
      // }),
      body: test,
    });
    console.log("Register Sbumit response::", res);
    if (res.ok) {
      router.push("/login");
      router.refresh();
    } else {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
        // action: <ToastAction altText="Invalid Credentials">X</ToastAction>,
      });
    }
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <h2 className="font-bold  text-center">Register Form</h2>
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter Password again"
                      {...field}
                    />
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
            <Button type="submit" variant="destructive" className="w-full mt-6">
              Register
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default SignupForm;
