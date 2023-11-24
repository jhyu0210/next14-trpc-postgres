import React, { useState } from "react";
// import { AddProduct } from "../AddPorduct";
// import { ProductList } from "../ProductList";
// import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
// import DeleteButton from "../DeleteButton";
import { getImageswithSizes } from "@/lib/getImageSizes";
import BlurImage from "@/components/(Gallery)/BlurImage";

const Products = async () => {
  // const [selectedCategory,setSelectedCategory]=useState('')
  const session = await getServerSession();
  const data = await db.product.findMany();

  // const imagesData = data.map((item) => {
  //   return {
  //     id: item.id,
  //     imageUrl: item.imageUrl,
  //   };
  // });

  const imageswithsizes = await getImageswithSizes(data);
  // console.log("imagesData===========================", imageswithsizes);
  console.log("session", session);

  return (
    <>
      <div className="text-center">
        {session && (
          <Link
            href="/products/addProduct"
            className="text-sky-700 font-bold border border-green-400 p-2"
          >
            Add New Product
          </Link>
        )}
      </div>
      <div className="">
        <div className="grid grid-cols-gallery mt-4">
          {/* <div className="grid lg:grid-cols-4 lg:gap-2 md:grid-3 md:gap-2 sm:grid-2 sm:gap-2"> */}
          {imageswithsizes.map((item) => (
            <BlurImage key={item.id} image={item} session={session} />
          ))}
          {/* {data.map((item) => (
              <img key={item.id} src={item.imageUrl} alt="product image" />
            ))} */}
        </div>
      </div>
    </>
  );
};

export default Products;
