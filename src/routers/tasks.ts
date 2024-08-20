import express from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/tasks";

const tasksRouter = express.Router();

tasksRouter.get("/", getTasks);
tasksRouter.post("/create", createTask);
tasksRouter.post("/delete", deleteTask);
tasksRouter.post("/update", updateTask);

export default tasksRouter;
