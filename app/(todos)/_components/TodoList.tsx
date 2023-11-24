"use client";

import { useState } from "react";
import { trpc } from "../../_trpc/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
        <Input
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button
          variant="secondary"
          onClick={async () => {
            addTodo.mutate(content);
            setContent("");
          }}
        >
          Add Todo
        </Button>
      </div>
    </div>
  );
}
