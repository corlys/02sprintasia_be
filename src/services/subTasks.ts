import { eq } from "drizzle-orm";
import db from "../db";
import { SubTask, subTasks } from "../db/schema/subtasks";

export const insertSubTask = async (title: string, taskId: number) => {
  return db.insert(subTasks).values({
    taskId,
    title,
  });
};

export const deleteSubTaskById = async (id: number) => {
  return db
    .delete(subTasks)
    .where(eq(subTasks.id, id))
    .returning({ deletedId: subTasks.id });
};

export const updateSubTaskById = async (id: number, subTask: SubTask) => {
  return db
    .update(subTasks)
    .set(subTask)
    .where(eq(subTasks.id, id))
    .returning({ updatedId: subTasks.id });
};

export const getSubTaskByIdQuery = async (id: number) => {
  return db.query.subtasks.findFirst({
    where: eq(subTasks.id, id),
  });
};
