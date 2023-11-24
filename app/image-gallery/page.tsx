// import React from "react";
// "use client";
import BlurImage from "@/components/(Gallery)/BlurImage";
import { db } from "@/lib/db";
import { getImageswithSizes } from "@/lib/getImageSizes";
import { getServerSession } from "next-auth";
// import { getImageSize } from "next/dist/server/image-optimizer";
// import Image from "next/image";
// import { useState } from "react";

// function cn(...classes: string[]) {
//   return classes.filter(Boolean).join(" ");
// }

const images = [
  // {
  //   id: "11",
  //   // name: "James",
  //   // email: "jhyu0210@gmail.com",
  //   imageUrl:
  //     "https://qpymgpni0rwm7ryw.public.blob.vercel-storage.com/therapy_belt01-CH7YhrVKSujEC1t5aC0QZLMr3duJSv.gif",
  // },
  // {
  //   id: "10",
  //   // name: "James",
  //   // email: "ashleyyu@gmail.com",
  //   imageUrl:
  //     "https://qpymgpni0rwm7ryw.public.blob.vercel-storage.com/31-2-seBu36dlCySP9LqWRo5XBk8d0qVedz.JPG",
  // },
  {
    id: "1",
    // name: "James",
    // email: "sunjiyu@gmail.com",
    imageUrl: "https://i.imgur.com/6RWTagq.jpeg",
  },
  {
    id: "2",
    // name: "James",
    // email: "jinamkim0@gmail.com",
    imageUrl: "https://i.imgur.com/5y1VkWR.jpeg",
  },
  {
    id: "3",
    // name: "James",
    // email: "jinamkim0@gmail.com",
    imageUrl: "https://i.imgur.com/zpRicV4.jpeg",
  },
  {
    id: "4",
    // name: "James",
    // email: "jinamkim0@gmail.com",
    imageUrl: "https://i.imgur.com/r4IgKkX.jpeg",
  },
  {
    id: "5",
    // name: "James",
    // email: "youngmookkim@gmail.com",
    imageUrl: "https://i.imgur.com/o57G77h.jpeg",
  },
  {
    id: "6",
    // name: "James",
    // email: "youngmookkim@gmail.com",
    imageUrl: "https://i.imgur.com/zpRicV4.jpeg",
  },
];

export default async function Gallery() {
  const session = await getServerSession();
  // const photos = await db.product.findMany();

  const imageswithsizes = await getImageswithSizes(images);
  console.log(imageswithsizes);
  return (
    <div className=" mx-auto max-w-2xl  px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-gallery auto-rows-[10px] ">
        {/* <div className="grid grid-cols-gallery"> */}
        {/* <div className="grid grid-cols-3 gap-2 overflow-hidden"> */}
        {imageswithsizes.map((image) => (
          <BlurImage key={image.id} image={image} session={session} />
          // <Image
          //   src={image.imageUrl}
          //   sizes="(min-width: 1280px) 280px, (min-width: 1080px) calc(33.33vw - 37px), (min-width: 640px) calc(7.62vw + 235px), calc(100vw - 32px)"
          //   // fill={true}
          //   // className="object-cover"
          //   width={300}
          //   height={300}
          //   // width={image.size.width}
          //   // height={image.size.height}
          //   alt={image.id}
          //   key={image.id}
          // />
        ))}
      </div>
    </div>
  );
}

// type GalleryProp = {
//   image: { id: number; name: string; email: string; photo: string };
// };
// function BlurImage({ image }: GalleryProp) {
//   const [isLoading, setLoading] = useState(true);
//   return (
//     <a href="#" className="group">
//       <div className="aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 w-full overflow-hidden rounded-lg bg-gray-200">
//         <Image
//           src={image.photo}
//           className={cn(
//             "group-hover:opacity-75 duration-700 ease-in-out",
//             isLoading
//               ? "grayscale blur-2xl scale-110"
//               : "grayscale-0 blur-0 scale-100 "
//           )}
//           onLoadingComplete={() => setLoading(false)}
//           fill={true}
//           sizes="300"
//           style={{ objectFit: "cover" }}
//           alt={image.id.toString()}
//           placeholder="blur"
//           blurDataURL="https://bit.ly/placeholder-img"
//         />
//       </div>
//       <h3 className="mt-4 text-sm">{image.name}</h3>
//       <p className="mt-1 text=lg">{image.email}</p>
//     </a>
//   );
// }
