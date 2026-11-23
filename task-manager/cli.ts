import { addTask, setStatus, removeTask, filterByStatus } from "./tasks.js";
import type { Status, Task } from "./tasks.js";
import { loadTasks, saveTasks } from "./storage.js";

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
  const tasks = await loadTasks();

  switch (command) {
    case "add": {
      const updated = addTask(tasks, args.join(" "));
      await saveTasks(updated);
      printTasks(updated);
      break;
    }
    case "list": {
      const filter = args[0];
      if (filter === undefined) {
        printTasks(tasks);
      } else if (isStatus(filter)) {
        printTasks(filterByStatus(tasks, filter));
      } else {
        throw new Error("Unknown status: " + filter);
      }
      break;
    }
    case "done": {
      const updated = setStatus(tasks, parseId(args[0]), "done");
      await saveTasks(updated);
      printTasks(updated);
      break;
    }
    case "remove": {
      const updated = removeTask(tasks, parseId(args[0]));
      await saveTasks(updated);
      printTasks(updated);
      break;
    }
    default:
      console.log("Usage: add <title> | list [status] | done <id> | remove <id>");
  }
}

main().catch((error) => {
  console.log("Error:", error instanceof Error ? error.message : error);
  process.exitCode = 1;
});