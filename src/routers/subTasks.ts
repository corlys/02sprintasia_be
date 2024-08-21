import express from "express";
import {
  createSubtask,
  deleteSubTask,
  getSubTask,
  updateSubTask,
} from "../controllers/subTasks";

const subTasksRouter = express.Router();

subTasksRouter.get("/:id", getSubTask);
subTasksRouter.post("/create", createSubtask);
subTasksRouter.post("/update", updateSubTask);
subTasksRouter.post("/delete", deleteSubTask);

export default subTasksRouter;
