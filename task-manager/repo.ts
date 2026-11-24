import { pool } from "./db.js";
import type { Status, Task } from "./tasks.js";

export async function createTask(title: string): Promise<Task> {
  const trimmed = title.trim();
  if (trimmed === "") {
    throw new Error("Title cannot be empty");
  }
  const result = await pool.query<Task>(
    "INSERT INTO tasks (title) VALUES ($1) RETURNING id, title, status",
    [trimmed]
  );
  const row = result.rows[0];
  if (row === undefined) {
    throw new Error("Insert failed");
  }
  return row;
}

export async function changeStatus(id: number, status: Status): Promise<void> {
  const result = await pool.query(
    "UPDATE tasks SET status = $1 WHERE id = $2",
    [status, id]
  );
  if (result.rowCount === 0) {
    throw new Error("Task not found: " + id);
  }
}

export async function deleteTask(id: number): Promise<void> {
  const result = await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
  if (result.rowCount === 0) {
    throw new Error("Task not found: " + id);
  }
}

export async function listTasks(status?: Status): Promise<Task[]> {
  if (status === undefined) {
    const all = await pool.query<Task>(
      "SELECT id, title, status FROM tasks ORDER BY id"
    );
    return all.rows;
  }
  const filtered = await pool.query<Task>(
    "SELECT id, title, status FROM tasks WHERE status = $1 ORDER BY id",
    [status]
  );
  return filtered.rows;
}