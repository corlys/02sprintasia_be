// src/index.js
import express, { Express } from "express";
import { tasksRouter, subTasksRouter } from "./routers";

const app: Express = express();

app.use(express.json());
app.use("/tasks", tasksRouter);
app.use("/subtasks", subTasksRouter);

export default app;
