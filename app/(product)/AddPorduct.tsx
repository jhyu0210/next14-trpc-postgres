"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { addNewProduct } from "./actions";
import { experimental_useFormState as useFormState } from "react-dom";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { getImageData } from "@/lib/getImageData";
import { log } from "console";
import { PutBlobResult } from "@vercel/blob";

import { bizMenuData, bizAreaMenu } from "@/app/globalconstants";

console.log(bizMenuData[2].categories);
const bizAreaOptions = bizAreaMenu;
// const bizAreas = bizMenuData.map((menu) => menu.business);

// [ 'rnd-mass', 'precision-parts', 'mold-mass' ]
// const categoriesInBiz = console.log(bizAreas);

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];
export const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  //   description: z.string().optional(),
  category: z.string().min(1, "required"),
  businessArea: z.string().min(1, "required"),
  displayOrder: z.string().optional(),
  imageUrl: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    // .refine(
    //   (files) => files?.[0]?.size <= MAX_FILE_SIZE,
    //   `Max file size is 5MB.`
    // )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png, .gif and .webp files are accepted."
    ),
  app: z.string().optional(),
  mat: z.string().optional(),
});

const defaultValues = {
  //   imageUrl: null,
  title: "",
  businessArea: "",
  category: "",
  app: "",
  mat: "",
  displayOrder: "",
};

const initialState = {
  message: null,
};

export const AddProduct = () => {
  const [preview, setPreview] = useState<string | null>(null);
  // const [state, formAction] = useFormState(addNewProduct, initialState);
  // // const ref = useRef<HTMLFormElement>(null);
  // const { data, pending } = useFormStatus();
  // console.log("useFromStatus Data::::", data);
  const [bizArea, setBizArea] = useState("");
  const selectedBizCategories = bizMenuData.find(
    (biz) => biz.business === bizArea
  )?.categories;
  console.log(selectedBizCategories);

  const [prodCategory, setProdCategory] = useState("");

  const addForm = useForm<z.infer<typeof productSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(productSchema),
    defaultValues,
  });
  // type InputType = {
  //   title: string;
  //   imageUrl: [File];
  //   category: string;
  //   businessArea: string;

  // };
  async function Submit(values: z.infer<typeof productSchema>) {
    const formData = new FormData();
    Object.entries(values).forEach((item) => formData.append(item[0], item[1]));
    formData.delete("imageUrl");
    // formData.append("imageUrl", values.imageUrl[0].name);

    const file = values.imageUrl[0];

    const response = await fetch(`/api/upload?filename=${file.name}`, {
      method: "POST",
      body: file,
    });

    const newBlob = (await response.json()) as PutBlobResult;
    formData.append("imageUrl", newBlob.url);
    console.log("formdata imageUrl::", formData.get("imageUrl"));

    try {
      const newProduct = await addNewProduct(formData);
      console.log(newProduct);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Form {...addForm}>
        <form className="space-y-8" onSubmit={addForm.handleSubmit(Submit)}>
          {/* <form className="space-y-8" action={formAction}> */}
          <Avatar className="w-24 h-24">
            <AvatarImage
              src={preview ? preview : undefined}
              className="object-fill  w-24"
            />
            <AvatarFallback>BU</AvatarFallback>
          </Avatar>

          <FormField
            control={addForm.control}
            name="imageUrl"
            render={({ field: { onChange, value, ...rest } }) => (
              <>
                <FormItem>
                  <FormLabel>Product Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      {...rest}
                      onChange={(event) => {
                        const { files, displayUrl } = getImageData(event);
                        setPreview(displayUrl); // give type to useState
                        onChange(files);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={addForm.control}
            name="title"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} placeholder="Title" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={addForm.control}
            name="businessArea"
            render={({ field: { onChange, value, ...rest } }) => (
              <>
                <FormItem>
                  <FormLabel>BusinessArea: </FormLabel>
                  <Select
                    // name="category"
                    // onValueChange={onChange}
                    onValueChange={(value) => {
                      setBizArea(value);
                      onChange(value);
                      console.log("selected bizArea::::", bizArea);
                    }}
                    value={value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Business Area" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {bizAreaOptions.map((option) => (
                        <SelectItem value={option.name} key={option.id}>
                          {option.field}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={addForm.control}
            name="category"
            render={({ field: { onChange, value, ...rest } }) => (
              <>
                <FormItem>
                  <FormLabel>Cagetgory: </FormLabel>

                  <Select
                    name="category"
                    onValueChange={onChange}
                    value={value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {selectedBizCategories &&
                        selectedBizCategories.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.field}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={addForm.control}
            name="app"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Application: </FormLabel>

                  <Select
                    name="app"
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Application" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="m@example.com">
                        m@example.com
                      </SelectItem>
                      <SelectItem value="m@google.com">m@google.com</SelectItem>
                      <SelectItem value="m@support.com">
                        m@support.com
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={addForm.control}
            name="mat"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Material: </FormLabel>

                  <Select
                    name="mat"
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Material" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="m@example.com">
                        m@example.com
                      </SelectItem>
                      <SelectItem value="m@google.com">m@google.com</SelectItem>
                      <SelectItem value="m@support.com">
                        m@support.com
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <div>
            <Button type="submit">Add New Product</Button>
          </div>
        </form>
      </Form>
    </>
  );
};
