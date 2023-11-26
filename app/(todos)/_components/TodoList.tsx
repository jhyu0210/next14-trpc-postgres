"use client";

import { useState } from "react";
import { trpc } from "../../_trpc/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { serverClient } from "@/app/_trpc/serverClient";

export default function TodoList({
  initialTodos,
}: {
  initialTodos: Awaited<ReturnType<(typeof serverClient)["getTodos"]>>;
}) {
  const [content, setContent] = useState("");
  const getTodos = trpc.getTodos.useQuery(undefined, {
    initialData: initialTodos,
    // type??? serverside render
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const addTodo = trpc.addTodo.useMutation({
    onSettled: () => getTodos.refetch(),
  });
  const setDone = trpc.setDone.useMutation({
    onSettled: () => getTodos.refetch(),
  });

  return (
    <div>
      <ul className="text-blue-500 my-5 text-3xl">
        {getTodos &&
          getTodos?.data?.map((todo) => (
            <li key={todo.id} className="flex gap-3 items-center">
              <input
                onChange={async () => {
                  setDone.mutate({ id: todo.id, done: !todo.done });
                }}
                id={`check-${todo.id}`}
                type="checkbox"
                checked={todo.done}
                style={{ zoom: 1.5 }}
              />
              {todo.content}
            </li>
          ))}
      </ul>
      <div className="border border-slate-200 p-2">
        <Label htmlFor="content">Content</Label>
        <Input
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button
          variant="default"
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
