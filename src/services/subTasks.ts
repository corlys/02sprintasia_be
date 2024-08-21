import { eq, and, desc } from "drizzle-orm";
import db from "../db";
import { SubTask, subTasks } from "../db/schema/subtasks";

export const insertSubTask = async (title: string, taskId: number) => {
  return db
    .insert(subTasks)
    .values({
      taskId,
      title,
    })
    .returning({ createdId: subTasks.id });
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
  return db.query.subTasks.findFirst({
    where: eq(subTasks.id, id),
  });
};

export const getSubTasksByTaskIdQUery = async (taskId: number) => {
  return db.query.subTasks.findMany({
    orderBy: [desc(subTasks.id)],
    where: eq(subTasks.taskId, taskId),
  });
};

export const getCompletedSubTaskByTaskIdQuery = async (taskId: number) => {
  return db.query.subTasks.findMany({
    orderBy: [desc(subTasks.id)],
    where: and(eq(subTasks.taskId, taskId), eq(subTasks.completed, true)),
  });
};
