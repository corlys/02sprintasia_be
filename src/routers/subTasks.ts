import express from "express";
import {
  createSubtask,
  deleteSubTask,
  updateSubTask,
} from "../controllers/subTasks";

const subTasksRouter = express.Router();

subTasksRouter.post("/create", createSubtask);
subTasksRouter.post("/update", updateSubTask);
subTasksRouter.post("/delete", deleteSubTask);

export default subTasksRouter;
