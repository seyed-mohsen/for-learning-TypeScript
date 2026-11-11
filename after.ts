export type Status = "todo" | "doing" | "done";

export interface Job {
  id: number;
  title: string;
  status: Status;
}

function formatJob(job: Job): string {
  return job.title.toUpperCase() + " - " + job.id;
}

export function formatJobs(jobs: Job[]): string[] {
  return jobs.map(formatJob);
}

export function formatJobsByStatus(jobs: Job[], status: Status): string[] {
  return formatJobs(jobs.filter((job) => job.status === status));
}