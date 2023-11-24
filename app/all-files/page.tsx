import React from "react";
import { list } from "@vercel/blob";
import DeleteButton from "./delete-button";

const AllFilesPage = async () => {
  const { blobs } = await list();
  console.log({ blobs });
  return (
    <div className="mt-32">
      {blobs.map((blob) => (
        <div key={blob.url}>
          {blob.pathname}- <DeleteButton url={blob.url} />
        </div>
      ))}
    </div>
  );
};

export default AllFilesPage;
