import { readFile, writeFile } from "node:fs/promises";
import type { Task } from "./tasks.js";

const FILE = "tasks.json";

export async function loadTasks(): Promise<Task[]> {
  let text: string;
  try {
    text = await readFile(FILE, "utf-8");
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
  try {
    return JSON.parse(text) as Task[];
  } catch {
    throw new Error(FILE + " is corrupted. Fix or delete it.");
  }
}

export async function saveTasks(tasks: Task[]): Promise<void> {
  await writeFile(FILE, JSON.stringify(tasks, null, 2), "utf-8");
}