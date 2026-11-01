import type { Todo } from "./types"

const BASE_URL = "https://jsonplaceholder.typicode.com/todos/";

async function getTodo(id: number):Promise<Todo> {
    const response = await fetch(BASE_URL + id );
    if (!response.ok) {
        throw new Error("HTTP "+ response.status);
    }
    return (await response.json()) as Todo;
}

async function main ():Promise<void> {
    try {
        const todo = await getTodo(7);
        console.log(todo.title);
        const missing = await getTodo(99999);
        console.log(missing.title);
    } catch (error) {
        console.log("Failed:", error instanceof Error ? error.message : error);
    }
}

main();