"use server";

import { revalidatePath } from "next/cache";
import { createTask, deleteTask, updateStatus } from "@/db/queries";

export async function addTask(formData: FormData) {
  const title = formData.get("title") as string;
  const assignee = formData.get("assignee") as string;
  const dueDate = formData.get("dueDate") as string;

  if (!title) return;

  await createTask({ title, assignee, dueDate, status: "В работе", progress: 0 });
  revalidatePath("/");
}

export async function removeTask(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) return;
  await deleteTask(id);
  revalidatePath("/");
}

export async function markDone(formData: FormData) {
  const id = Number(formData.get("id"));
  const status = formData.get("status") as string;
  if (!id) return;
  const newStatus = status === "Выполнено" ? "В работе" : "Выполнено";
  await updateStatus(id, newStatus);
  revalidatePath("/");
}