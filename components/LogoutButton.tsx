"use client";
import { signOut } from "next-auth/react";
import React from "react";
import { Button } from "./ui/button";

const LogoutButton = () => {
  return (
    <Button
      onClick={() =>
        signOut({
          redirect: true,
          // callbackUrl: "/",
          callbackUrl: `${window.location.origin}`,
        })
      }
      variant="destructive"
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
