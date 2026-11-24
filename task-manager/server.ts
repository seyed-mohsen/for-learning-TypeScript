import express from "express";
import type { NextFunction, Request, Response } from "express";
import {
    createTask,
    changeStatus,
    deleteTask,
    listTasks,
    NotFoundError,
} from "./repo.js";
import type { Status } from "./tasks.js";

const app = express();
app.use(express.json());

function isStatus(value: unknown): value is Status{
    return value === "todo" || value === "doing" || value === "done";
}

function parseId (value : string | undefined): number | undefined{
    const id = Number(value); 
    return Number.isInteger(id) && id > 0 ? id : undefined ;
}

app.get("/tasks", async (req, res) => {
    const status = req.query.status;
    if (status === undefined) { 
        res.json(await listTasks());
        return;
    }
    if (!isStatus(status)) {
        res.status(400).json({ error: "title must be a non-empty string" });
        return;
    }
    res.json(await listTasks(status));
});

app.post("/tasks", async (req, res) => {
  const title: unknown = req.body?.title;
  if (typeof title !== "string" || title.trim() === "") {
    res.status(400).json({ error: "title must be a non-empty string" });
    return;
  }
  const task = await createTask(title);
  res.status(201).json(task);
});

app.patch("/tasks/:id", async (req, res) => {
  const id = parseId(req.params.id);
  const status: unknown = req.body?.status;
  if (id === undefined || !isStatus(status)) {
    res.status(400).json({ error: "valid id and status are required" });
    return;
  }
  await changeStatus(id, status);
  res.json({ ok: true });
});

app.delete("/tasks/:id", async (req, res) => {
  const id = parseId(req.params.id);
  if (id === undefined) {
    res.status(400).json({ error: "valid id is required" });
    return;
  }
  await deleteTask(id);
  res.status(204).send();
});

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof NotFoundError) {
    res.status(404).json({ error: error.message });
    return;
  }
  console.log("Unexpected error:", error);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = 3000;
app.listen(PORT, "127.0.0.1", () => {
  console.log("Server running on http://localhost:" + PORT);
});