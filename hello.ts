function greet(name: string): string {
    return "Hello, " + name;
}

console.log(greet("Ali"));
console.log(greet("AmirM"));


function add(a: number, b: number): number {
    return a + b;
}

console.log(add(2, 3));


interface Task {
    id: number;
    title: string;
    done: boolean;
}

function describe(task: Task): string {
    return task.title + (task.done ? " (done) " : " (pending) ");
}

const t1: Task = { id: 1, title: "Learn typescript", done: false };
const t2: Task = { id: 2, title: "Write", done: true };


console.log(describe(t1));
console.log(describe(t2));

type Status = "todo" | "doing" | "done";

function printStatus(status: Status): string {
    return "Status: " + status;
}

console.log(printStatus("todo"));
console.log(printStatus("doing"));
console.log(printStatus("done"));


interface Job {
    id: number;
    title: string;
    status: Status;
    dueDate?: string ;
}

function describeJob(job: Job): string {
    return job.title + "[" + job.status + "]";
}

const j1: Job = { id: 1, title: "Learn unions", status: "doing" };
const j2: Job = { id: 2, title: "Write tests", status: "done" };


console.log(describeJob(j1));
console.log(describeJob(j2));

const jobs: Job[] = [
    { id: 1, title: "Learn unions", status: "doing" },
    { id: 2, title: "Write tests", status: "done" },
    { id: 3, title: "Deploy app", status: "todo" },
    { id: 4, title: "Fix bugs", status: "done" },
]

function filterByStatus(list:Job[], status: Status): Job[] {
    return list.filter((job) => job.status === status);
}

const doneJobs = filterByStatus(jobs, "done");
console.log(doneJobs.length);
console.log(doneJobs.map((job) => job.title));






function countByStatus (list:Job[] , status : Status): number{
    return list.filter((job) => job.status === status).length;
}

const doneCount = countByStatus(jobs, "done");
console.log(doneCount);


const j3: Job = { id : 5 , title : "No date job" , status : "todo"} ; 
function showDate (job : Job ) : string {
    return job.dueDate?.toUpperCase() ?? "No date";
}

console.log(showDate(j3));


const j4: Job = { id: 6, title: "Has date", status: "doing", dueDate: "soon" };

console.log(showDate(j4));


interface User {
    name : string ; 
    email? : string | null;
}

const u1 : User = { name : "Ali" , email : null};
const u2 : User = { name : "Sara" , email : "Sara@Gmail.Com"};
const u3 : User = { name : "Amir"};

function showEmail(user : User) : string {
    return user.email?.toLowerCase() ?? "No email";
}

console.log(showEmail(u1));
console.log(showEmail(u2));
console.log(showEmail(u3));


function findJobById (list : Job[] , id : number) : Job | undefined{
    return list.find( (job) => job.id === id) ;
}


const job1 = findJobById(jobs, 1);
const job99 = findJobById(jobs, 99);
console.log(job1?.title ?? "Not found");
console.log(job99?.title ?? "Not found");
