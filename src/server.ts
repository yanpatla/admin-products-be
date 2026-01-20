import express from "express";
import colors from "colors";
import router from "./routes";
import db from "./config/db";
import morgan from "morgan";
import cors, { CorsOptions } from "cors";

async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.magenta("Successfull connection to the DB"));
  } catch (error) {
    // console.log(error);
    console.log(colors.red.bold("There was an error to connect to the DB"));
  }
}
connectDB();
const server = express();

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error("CORS Error"), false);
    }
  },
};
server.use(cors(corsOptions));
server.use(express.json());
server.use(morgan("dev"));
server.use("/api/products", router);
export default server;
