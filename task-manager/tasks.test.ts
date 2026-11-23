import { describe, it, expect } from "vitest";
import { addTask, setStatus, removeTask, filterByStatus } from "./tasks.js";
import type { Task } from "./tasks.js";

const base: Task[] = [
  { id: 1, title: "A", status: "todo" },
  { id: 2, title: "B", status: "done" },
];

describe("addTask", () => {
  it("adds a task with the next id and status todo", () => {
    const result = addTask(base, "C");
    expect(result).toHaveLength(3);
    expect(result[2]).toEqual({ id: 3, title: "C", status: "todo" });
  });

  it("starts ids from 1 for an empty list", () => {
    expect(addTask([], "First")[0]?.id).toBe(1);
  });

  it("rejects an empty title", () => {
    expect(() => addTask(base, "   ")).toThrow("Title cannot be empty");
  });

  it("does not change the original list", () => {
    addTask(base, "C");
    expect(base).toHaveLength(2);
  });
});

describe("setStatus", () => {
  it("changes only the chosen task", () => {
    const result = setStatus(base, 1, "done");
    expect(result[0]?.status).toBe("done");
    expect(result[1]).toEqual(base[1]);
  });

  it("throws for an unknown id", () => {
    expect(() => setStatus(base, 99, "done")).toThrow("Task not found: 99");
  });
});

describe("removeTask", () => {
  it("removes the chosen task", () => {
    expect(removeTask(base, 1)).toEqual([base[1]]);
  });

  it("throws for an unknown id", () => {
    expect(() => removeTask(base, 99)).toThrow("Task not found: 99");
  });
});

describe("filterByStatus", () => {
  it("returns only matching tasks", () => {
    expect(filterByStatus(base, "done")).toEqual([base[1]]);
  });

  it("returns an empty list when nothing matches", () => {
    expect(filterByStatus(base, "doing")).toEqual([]);
  });
});