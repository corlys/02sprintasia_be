import { desc, eq } from "drizzle-orm";
import db from "../db";
import { Task, tasks } from "../db/schema/tasks";

export const insertTask = async (
  title: string,
  description: string,
  deadline?: string,
) => {
  return db.insert(tasks).values({
    title,
    description,
    deadline: deadline ? new Date(deadline) : null,
  });
};

export const getTasksQuery = async () => {
  return db.query.tasks.findMany({
    orderBy: [desc(tasks.id)],
    with: {
      subTasks: {
        orderBy: (subTasks, { desc }) => [desc(subTasks.id)],
      },
    },
  });
};

export const getTaskByIdQuery = async (id: number) => {
  return db.query.tasks.findFirst({
    where: eq(tasks.id, id),
    with: {
      subTasks: {
        orderBy: (subTasks, { desc }) => [desc(subTasks.id)],
      },
    },
  });
};

export const deleteTaskById = async (id: number) => {
  return db
    .delete(tasks)
    .where(eq(tasks.id, id))
    .returning({ deletedId: tasks.id });
};

export const updateTaskById = async (id: number, task: Task) => {
  return db
    .update(tasks)
    .set(task)
    .where(eq(tasks.id, id))
    .returning({ updatedId: tasks.id });
};
