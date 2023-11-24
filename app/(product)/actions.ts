"use server";

import { db } from "@/lib/db";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
// import { format } from "path";

export async function addNewProduct(values: FormData) {
  //   const files = values.get("imageUrl");
  const newProduct = {
    title: values.get("title") as string,
    imageUrl: values.get("imageUrl") as string,
    businessArea: values.get("businessArea") as string,
    category: values.get("category") as string,
    displayOrder: Number(values.get("displayOrder")),
    mat: values.get("mat") as string,
    app: values.get("app") as string,
  };
  console.log("add New Product ===", newProduct);

  const res = await db.product.create({ data: newProduct });
  return res;

  //   let entries = FormData.keys()
  //   for (let [key, val] of values.entries()) {
  //     console.log({ key, val });
  //   }

  //     return { key: key, value: value };
  //   });
  //   console.log(data);
  //   return { message: "success" };
}
export async function deleteProduct(id: string) {
  // console.log("product Actions.ts logs ==========");
  // console.log("deleting id:: ", id);
  try {
    const product = await db.product.findUnique({
      where: {
        id,
      },
    });
    if (product) {
      // console.log(product);
      if (
        product.imageUrl.includes(
          "qpymgpni0rwm7ryw.public.blob.vercel-storage.com"
        )
      ) {
        // console.log("case: imageUrl in blob:::", product.imageUrl);
        try {
          // console.log("trying to delete...");
          await del(product.imageUrl);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("No Product!!! in Vercel Blob");
        // return { message: "No product found!" };
      }
      // console.log("Product Found!, delete:: DB.. ", product.id);
      await db.product.delete({
        where: {
          id: product.id,
        },
      });
    }

    revalidatePath("/products");
  } catch (e) {
    console.log(e);
  }
}
