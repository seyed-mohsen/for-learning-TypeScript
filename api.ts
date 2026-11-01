import type { Todo } from "./types"

const BASE_URL = "https://jsonplaceholder.typicode.com/todos/";

async function getTodo(id: number): Promise<Todo> {
    const response = await fetch(BASE_URL + id);
    if (!response.ok) {
        throw new Error("HTTP " + response.status);
    }
    return (await response.json()) as Todo;
}

async function getTodos(ids: number[]): Promise<Todo[]> {
  const promises = ids.map((id) => getTodo(id));
  return Promise.all(promises);
}
async function main(): Promise<void> {
  try {
    const todos = await getTodos([1, 2, 3]);
    console.log(todos.map((t) => t.title));
    const bad = await getTodos([1, 99999]);
    console.log(bad.length);
  } catch (error) {
    console.log("Failed:", error instanceof Error ? error.message : error);
  }
}

main();