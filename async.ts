function wait(ms : number) : Promise<string>{
    return new Promise((resolve) => {
        setTimeout(()=> resolve("done waiting"), ms);
    });
}

async function run(): Promise<void>{
    console.log("start");
    const result = await wait(1000);
    console.log(result);
    console.log("end");
}

run() ; 
console.log("after run");