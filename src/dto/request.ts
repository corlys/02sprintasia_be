import { z } from "zod";

export const CreateTodoRequest = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export const DeleteTodoRequest = z.object({
  id: z.number(),
});

export const UpdateTodoRequest = z.object({
  id: z.number(),
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.string().optional(),
});

export const CreateSubTodoRequest = z.object({
  title: z.string().min(1),
  taskId: z.number(),
});

export const DeleteSubTodoRequest = z.object({
  id: z.number(),
});

export const UpdateSubTodoRequest = z.object({
  id: z.number(),
  title: z.string().optional(),
  completed: z.string().optional(),
});
