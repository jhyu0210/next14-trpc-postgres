import probe from "probe-image-size";
import { db } from "./db";

// export async function getImageswithSizes(items) {
//   // console.log("getImageswithSizes============", images);
//   const itemsWithSizes = await Promise.all(
//     items.map(async (image) => {
//       const imageWithSize = image;
//       // console.log(image.imageUrl);
//       imageWithSize.size = await probe(image.imageUrl);
//       return imageWithSize;
//     })
//   );
//   // console.log(imagesWithSizes);
//   return itemsWithSizes;
// }
const deleteBrokenImage = async (item: any) => {
  try {
    // 2️⃣ Probe each account profile image
    // console.log("Do not delete ", item.id);
    const itemWithSize = await probe(item.imageUrl);
    // console.log("itemWithSize>>>> ", itemWithSize);
    return itemWithSize;
  } catch (error) {
    // 3️⃣ Delete the account record if the image is unavailable
    await db.product.delete({ where: { id: item.id } });
    // console.log("Deleted ", item.id);
  }
};

export async function getImageswithSizes(items: any) {
  // console.log("Promise All:::::::::", items);
  return await Promise.all(
    items.map(async (item: any) => {
      const itemWithSizes = item;
      itemWithSizes.size = await deleteBrokenImage(item);
      return itemWithSizes;
    })
  );
}
