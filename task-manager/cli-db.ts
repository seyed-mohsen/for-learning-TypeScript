import { createTask, changeStatus, deleteTask, listTasks } from "./repo.js";
import { pool } from "./db.js";
import type { Status, Task } from "./tasks.js";

function isStatus(value: string): value is Status {
  return value === "todo" || value === "doing" || value === "done";
}

function parseId(value: string | undefined): number {
  const id = Number(value);
  if (!Number.isInteger(id)) {
    throw new Error("Task id must be a number");
  }
  return id;
}

function printTasks(tasks: Task[]): void {
  if (tasks.length === 0) {
    console.log("No tasks.");
    return;
  }
  for (const task of tasks) {
    console.log(task.id + ". [" + task.status + "] " + task.title);
  }
}

async function main(): Promise<void> {
  const [command, ...args] = process.argv.slice(2);
  try {
    switch (command) {
      case "add": {
        await createTask(args.join(" "));
        printTasks(await listTasks());
        break;
      }
      case "list": {
        const filter = args[0];
        if (filter === undefined) {
          printTasks(await listTasks());
        } else if (isStatus(filter)) {
          printTasks(await listTasks(filter));
        } else {
          throw new Error("Unknown status: " + filter);
        }
        break;
      }
      case "done": {
        await changeStatus(parseId(args[0]), "done");
        printTasks(await listTasks());
        break;
      }
      case "remove": {
        await deleteTask(parseId(args[0]));
        printTasks(await listTasks());
        break;
      }
      default:
        console.log("Usage: add <title> | list [status] | done <id> | remove <id>");
    }
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.log("Error:", error instanceof Error ? error.message : error);
  process.exitCode = 1;
});