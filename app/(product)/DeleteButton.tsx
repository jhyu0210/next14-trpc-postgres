"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { deleteProduct } from "./actions";

type DeletButtonProp = {
  id: string;
};

const DeleteButton = ({ id }: DeletButtonProp) => {
  return <Button onClick={() => deleteProduct(id)}>X</Button>;
};

export default DeleteButton;
