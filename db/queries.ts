import { db } from "./db";
import { tasks } from "./schema";
import { eq } from "drizzle-orm";

export async function getTasks() {
  return db.select().from(tasks);
}

export async function createTask(data: {
  title: string;
  assignee?: string;
  dueDate?: string;
  status?: string;
  progress?: number;
}) {
  return db.insert(tasks).values(data).returning();
}

export async function deleteTask(id: number) {
  return db.delete(tasks).where(eq(tasks.id, id));
}

export async function updateStatus(id: number, status: string) {
  const progress = status === "Выполнено" ? 100 : 0;
  return db.update(tasks).set({ status, progress }).where(eq(tasks.id, id));
}