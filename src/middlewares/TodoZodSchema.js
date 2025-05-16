import { z } from "zod";

const createTodo = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

const updateTodo = z.object({
  id: z.string(),
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  isCompleted: z.boolean().optional(),
});

export { createTodo, updateTodo };
