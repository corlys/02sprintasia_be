import {
  pgTable,
  serial,
  varchar,
  timestamp,
  boolean,
  integer,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import tasks from "./tasks";

export const subTasks = pgTable("sub_tasks", {
  id: serial("id").primaryKey(),
  taskId: integer("task_id")
    .references(() => tasks.id, { onDelete: "cascade" })
    .notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  completed: boolean("completed").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type SubTask = typeof subTasks.$inferSelect;
export type NewSubTask = typeof subTasks.$inferInsert;

export const subTaskRelations = relations(subTasks, ({ one }) => ({
  task: one(tasks, {
    fields: [subTasks.taskId],
    references: [tasks.id],
  }),
}));

export default subTasks;
