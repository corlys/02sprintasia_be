import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  deleteSubTaskById,
  getCompletedSubTaskByTaskIdQuery,
  getSubTaskByIdQuery,
  insertSubTask,
  updateSubTaskById,
} from "../services/subTasks";
import {
  CreateSubTodoRequest,
  DeleteSubTodoRequest,
  GetSubTodoRequest,
  UpdateSubTodoRequest,
} from "../dto/request";
import { getTaskByIdQuery, updateTaskById } from "../services/tasks";

export const createSubtask = async (req: Request, res: Response) => {
  try {
    const result = CreateSubTodoRequest.safeParse(req.body);
    if (!result.success)
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "BAD_REQUEST" });
    const { title, taskId } = result.data;
    const creationResult = await insertSubTask(title, taskId);
    const subTask = await getSubTaskByIdQuery(creationResult[0].createdId);
    if (!subTask) throw Error("Technically Not Possible (?)");
    const task = await getTaskByIdQuery(subTask.taskId);
    if (task?.subTasks) {
      const completedSubTasksByTaskId = await getCompletedSubTaskByTaskIdQuery(
        subTask.taskId,
      );
      if (
        task.subTasks.length === completedSubTasksByTaskId.length &&
        task.subTasks.length !== 0
      ) {
        task.status = "finished";
        await updateTaskById(subTask.taskId, task);
      } else {
        if (task.status !== "ongoing") {
          task.status = "ongoing";
          await updateTaskById(subTask.taskId, task);
        }
      }
    }
    return res.status(StatusCodes.OK).json({
      message: "Successfully created a subtask",
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "INTERNAL_SERVER_ERROR",
    });
  }
};

export const deleteSubTask = async (req: Request, res: Response) => {
  try {
    const result = DeleteSubTodoRequest.safeParse(req.body);
    if (!result.success)
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "BAD_REQUEST" });
    const { id } = result.data;
    const subTask = await getSubTaskByIdQuery(id);
    if (!subTask)
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "BAD_REQUEST" });
    const deletionResult = await deleteSubTaskById(id);
    const task = await getTaskByIdQuery(subTask.taskId);
    if (task?.subTasks) {
      const completedSubTasksByTaskId = await getCompletedSubTaskByTaskIdQuery(
        subTask.taskId,
      );
      if (
        task.subTasks.length === completedSubTasksByTaskId.length &&
        task.subTasks.length !== 0
      ) {
        task.status = "finished";
        await updateTaskById(subTask.taskId, task);
      } else {
        if (task.status !== "ongoing") {
          task.status = "ongoing";
          await updateTaskById(subTask.taskId, task);
        }
      }
    }
    return res.status(StatusCodes.OK).json({
      message: `Successfully deleted subtask with id ${deletionResult[0].deletedId}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "INTERNAL_SERVER_ERROR",
    });
  }
};

export const updateSubTask = async (req: Request, res: Response) => {
  try {
    const result = UpdateSubTodoRequest.safeParse(req.body);
    if (!result.success)
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "BAD_REQUEST" });
    const { id, title, completed } = result.data;
    const subTask = await getSubTaskByIdQuery(id);
    if (!subTask)
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "BAD_REQUEST" });
    if (title) subTask.title = title;
    if (completed) {
      if (completed === "true") subTask.completed = true;
      else subTask.completed = false;
    }
    const updateResult = await updateSubTaskById(id, subTask);
    const task = await getTaskByIdQuery(subTask.taskId);
    if (task?.subTasks) {
      const completedSubTasksByTaskId = await getCompletedSubTaskByTaskIdQuery(
        subTask.taskId,
      );
      if (
        task.subTasks.length === completedSubTasksByTaskId.length &&
        task.subTasks.length !== 0
      ) {
        task.status = "finished";
        await updateTaskById(subTask.taskId, task);
      } else {
        if (task.status !== "ongoing") {
          task.status = "ongoing";
          await updateTaskById(subTask.taskId, task);
        }
      }
    }
    return res.status(StatusCodes.OK).json({
      message: `Succefully updated subtask with id ${updateResult[0].updatedId}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "INTERNAL_SERVER_ERROR",
    });
  }
};

export const getSubTask = async (req: Request, res: Response) => {
  try {
    const result = GetSubTodoRequest.safeParse(req.params);
    if (!result.success)
      return res.status(StatusCodes.NOT_FOUND).json({ error: "NOT_FOUND" });
    const { id } = result.data;
    const subTask = await getSubTaskByIdQuery(parseInt(id));
    return res.status(StatusCodes.OK).json({
      subTask,
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "INTERNAL_SERVER_ERROR",
    });
  }
};
