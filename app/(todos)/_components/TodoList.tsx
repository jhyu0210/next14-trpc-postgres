"use client";

import { useState } from "react";
import { trpc } from "../../_trpc/client";

export default function TodoList() {
  const [content, setContent] = useState("");
  const getTodos = trpc.getTodos.useQuery();
  const addTodo = trpc.addTodo.useMutation({
    onSettled: () => getTodos.refetch(),
  });

  return (
    <div>
      <div>{JSON.stringify(getTodos.data)}</div>
      <div>
        <label htmlFor="content">Content</label>
        <input
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          onClick={async () => {
            addTodo.mutate(content);
            setContent("");
          }}
        >
          Add Todo
        </button>
      </div>
    </div>
  );
}
