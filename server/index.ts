import { db } from "@/lib/db";
import { publicProceduer, router } from "./trpc";
import { z } from "zod";

export const appRouter = router({
  getTodos: publicProceduer.query(async () => {
    console.log("index...");
    // return [10, 20, 30];
    return await db.todo.findMany();
  }),
  addTodo: publicProceduer.input(z.string()).mutation(async (opts) => {
    await db.todo.create({
      data: { content: opts.input, done: false },
    });
  }),
  setDone: publicProceduer
    .input(
      z.object({
        id: z.string(),
        done: z.boolean(),
      })
    )
    .mutation(async (opts) => {
      await db.todo.update({
        data: { done: opts.input.done },
        where: {
          id: opts.input.id,
        },
      });
    }),
});

export type AppRouter = typeof appRouter;
