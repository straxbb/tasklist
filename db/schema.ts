import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const tasks = sqliteTable("tasks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  assignee: text("assignee").default("Не назначен"),
  dueDate: text("due_date"),
  status: text("status").default("В работе"),
  progress: integer("progress").default(0),
  createdAt: text("created_at").default(new Date().toISOString()),
});