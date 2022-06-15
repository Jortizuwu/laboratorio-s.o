import dotenv from "dotenv";
import express, { Application } from "express";
import cors from "cors";

import { dbConnection } from "./db/connection";
import { catalogue, process, processys } from "./routes";

dotenv.config();
const app: Application = express();

//db connection
dbConnection();

// Middlewares

//cors
app.use(cors());

//body reading
app.use(express.json());

//Routes
app.use("/catalogue", catalogue);
app.use("/process", process);
app.use("/processys", processys);

//listen
app.listen("8080", () => console.log("server running in the port", 8080));

export default app;
