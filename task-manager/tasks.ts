export type Status = "todo" | "doing" | "done";

export interface Task {
  id: number;
  title: string;
  status: Status;
}

function assertExists(tasks: Task[], id: number): void {
  if (!tasks.some((task) => task.id === id)) {
    throw new Error("Task not found: " + id);
  }
}

export function addTask(tasks: Task[], title: string): Task[] {
  const trimmed = title.trim();
  if (trimmed === "") {
    throw new Error("Title cannot be empty");
  }
  const nextId =
    tasks.length === 0 ? 1 : Math.max(...tasks.map((task) => task.id)) + 1;
  return [...tasks, { id: nextId, title: trimmed, status: "todo" }];
}

export function setStatus(tasks: Task[], id: number, status: Status): Task[] {
  assertExists(tasks, id);
  return tasks.map((task) => (task.id === id ? { ...task, status } : task));
}

export function removeTask(tasks: Task[], id: number): Task[] {
  assertExists(tasks, id);
  return tasks.filter((task) => task.id !== id);
}

export function filterByStatus(tasks: Task[], status: Status): Task[] {
  return tasks.filter((task) => task.status === status);
}