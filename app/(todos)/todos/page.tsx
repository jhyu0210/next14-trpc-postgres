import React from "react";
import TodoList from "../_components/TodoList";
import { serverClient } from "@/app/_trpc/serverClient";

const Todos = async () => {
  const todos = await serverClient.getTodos();
  return (
    <div>
      <TodoList initialTodos={todos} />
    </div>
  );
};

export default Todos;
