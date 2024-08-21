import express from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/tasks";

const tasksRouter = express.Router();

tasksRouter.get("/", getTasks);
tasksRouter.get("/:id", getTask);
tasksRouter.post("/create", createTask);
tasksRouter.post("/delete", deleteTask);
tasksRouter.post("/update", updateTask);

export default tasksRouter;
