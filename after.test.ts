import { describe, it, expect } from "vitest";
import { formatJobsByStatus } from "./after.js";
import type { Job } from "./after.js";

const jobs: Job[] = [
  { id: 1, title: "Write tests", status: "done" },
  { id: 2, title: "Deploy", status: "todo" },
];

describe("formatJobsByStatus", () => {
  it("returns only jobs with the given status", () => {
    expect(formatJobsByStatus(jobs, "done")).toEqual(["WRITE TESTS - 1"]);
  });

  it("returns an empty list when nothing matches", () => {
    expect(formatJobsByStatus(jobs, "doing")).toEqual([]);
  });
});