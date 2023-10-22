"use client";
import { Button } from "@/components/ui/button";
import React, { FormEvent } from "react";

const form = () => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await fetch(`/api/auth/register`, {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    console.log({ res });
  };
  return (
    <>
      <h2>Register Form</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 mx-auto max-w-md mt-10"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border border-slate-800"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="border border-slate-800"
        />
        <Button variant="outline">Register</Button>
      </form>
    </>
  );
};

export default form;
