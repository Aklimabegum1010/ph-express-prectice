import express, {type Application, type Requset, type Response} from "express"
import {config} from "./config/index.js";
import {Pool} from "pg";


const app:Application = express()
const pool = new Pool({
connectionString: config.connection_string
})
// console.log(pool)

const initDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            age INT,
            is_Active BOOLEAN DEFAULT true,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
                );
        `);
        console.log("Database connected");
    } catch (err) {
        console.log(err);
    }
};

initDB();


app.get("/", (req: Request, res:Response) =>{
// res.send('this is root route')

    res.json({
message:'this is json'
    })
})


app.listen(config.port, () => {
console.log(`server connected ${config.port}`)
})