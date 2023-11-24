// import React from "react";
"use client";
import DeleteButton from "@/app/(product)/DeleteButton";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { useState } from "react";

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type ProductProp = {
  image: {
    id: string;
    imageUrl: string;
    size: {
      width: number;
      height: number;
    };
  };
};
export type GalleryProp = {
  image: {
    id: string;
    imageUrl: string;
    category: string;
    businessArea: string;
    title: string;
    size: { width: number; height: number };
  };
  session: any;
};
export default function BlurImage({ image, session }: GalleryProp) {
  const [isLoading, setLoading] = useState(true);
  // console.log("images data:::", image);
  const widthHeightRatio = image.size.height / image.size.width;
  const galleryHeight = Math.ceil(300 * widthHeightRatio);
  const imageSpans = Math.ceil(galleryHeight / 10) + 1;
  return (
    <div
      className="w-[300px] justify-self-center" // tailwind cannot calculate
      style={{ gridRow: `span ${imageSpans}` }}
    >
      <div className="rounded-lg overflow-hidden group relative border border-slate-300 border-ra">
        <Image
          src={image.imageUrl}
          alt={image.imageUrl}
          // sizes="(min-width: 1280px) 280px, (min-width: 1080px) calc(33.33vw - 37px), (min-width: 640px) calc(7.62vw + 235px), calc(100vw - 32px)"
          sizes="300px"
          // width={300}
          width={image.size.width}
          // height={galleryHeight}
          height={image.size.height}
          // fill={true}
          className={cn(
            "object-cover group-hover:opacity-75 duration-700 ease-in-out ",
            isLoading
              ? "grayscale blur-2xl scale-110"
              : "grayscale-0 blur-0 scale-100 "
          )}
          onLoadingComplete={() => setLoading(false)}
          placeholder="blur"
          blurDataURL="https://bit.ly/placeholder-img"
        ></Image>

        <div className="absolute top-0 left-0 w-full z-10">
          <div className="flex justify-between items-center  p-2">
            <h2 className="font-bold text-sm p-1 rounded-lg bg-slate-200">
              {image.title}
            </h2>
            {session && <DeleteButton id={image.id} />}
          </div>
        </div>
      </div>
    </div>

    // <a href="#" className="group">
    //   <div className="aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 w-full overflow-hidden rounded-lg bg-gray-200">
    //     <Image
    //       src={image.imageUrl}
    //       className={cn(
    //         "group-hover:opacity-75 duration-700 ease-in-out",
    //         isLoading
    //           ? "grayscale blur-2xl scale-110"
    //           : "grayscale-0 blur-0 scale-100 "
    //       )}
    //       onLoadingComplete={() => setLoading(false)}
    //       fill={true}
    //       sizes="300"
    //       style={{ objectFit: "cover" }}
    //       alt={image.id.toString()}
    //       placeholder="blur"
    //       blurDataURL="https://bit.ly/placeholder-img"
    //     />
    //   </div>
    //   <h3 className="mt-4 text-sm">{image.name}</h3>
    //   <p className="mt-1 text=lg">{image.email}</p>
    // </a>
  );
}
