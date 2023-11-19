import { MongoClient } from "mongodb";

const connectionString = "mongodb://0.0.0.0:27017";

const client = new MongoClient(connectionString);

let conn;
try {
    conn = await client.connect();
    console.log("db has been connected")
} catch(e) {
    console.error(e);
    throw new Error("Cannot connected to db");
}

let db = conn.db("quiz");

export default db;
