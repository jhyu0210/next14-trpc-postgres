"use client";

import { useRouter } from "next/navigation";

type Props = {
  url: string;
};
const DeleteButton = ({ url }: Props) => {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        //hit api
        await fetch(`/api/upload`, {
          method: "DELETE",
          body: JSON.stringify({ url }),
        });
        router.refresh();
      }}
    >
      Delete
    </button>
  );
};

export default DeleteButton;
