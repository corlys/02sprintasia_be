import { relations } from "drizzle-orm";
import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";

import subsTasks from "./subtasks";

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  status: varchar("status", { length: 20 }).notNull().default("ongoing"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deadline: timestamp("deadline"),
});

export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;

export const taskRelations = relations(tasks, ({ many }) => ({
  subTasks: many(subsTasks),
}));

export default tasks;
