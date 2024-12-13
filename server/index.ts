import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";
import express from "express";
import bodyParser from "body-parser";
import authRouter from "./src/routes/auth";
import teacherRouter from "./src/routes/teacher";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/health", (req: Request, res: Response) => {
  res.send("App is running");
});
app.use("/api/auth", authRouter);
app.use("/api/teacher", teacherRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
