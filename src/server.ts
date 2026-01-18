import express from "express";
import router from "./routes";
import db from "./config/db";

async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log("Successfull connection to the DB");
  } catch (error) {
    console.log(error);
    console.log("There was an error to connect to the DB");
  }
}
connectDB();
const server = express();

server.use("/api/products", router);
export default server;
