import { error } from "node:console";
import pg from "pg";

const { Pool } = pg ; 
const pool = new Pool();

interface CustomerRow {
    id : number;
    code : string;
    name : string;
    has_shop:boolean;
    phone: string | null ;
    address : string | null ;
}

async function findByName(term:string):Promise<CustomerRow[]> {
    const result = await pool.query<CustomerRow>(
        "SELECT id , code , name , has_shop , phone , address FROM customers WHERE name ILIKE $1 ORDER BY name",
        ["%" + term + "%"]
    );
    return result.rows;
}

async function main(): Promise<void> {
    try {
        console.log(await findByName("ali"));
        console.log(await findByName("zzz"));
    } finally {
        await pool.end();
    }
}

main().catch((error) => {
    console.log("Error:", error instanceof Error ? error.message : error);
    process.exitCode = 1 ; 
});