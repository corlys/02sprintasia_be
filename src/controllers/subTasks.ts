import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  deleteSubTaskById,
  getSubTaskByIdQuery,
  insertSubTask,
  updateSubTaskById,
} from "../services/subTasks";
import {
  CreateSubTodoRequest,
  DeleteSubTodoRequest,
  UpdateSubTodoRequest,
} from "../dto/request";

export const createSubtask = async (req: Request, res: Response) => {
  try {
    const result = CreateSubTodoRequest.safeParse(req.body);
    if (!result.success)
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "BAD_REQUEST" });
    const { title, taskId } = result.data;
    await insertSubTask(title, taskId);
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
    const deletionResult = await deleteSubTaskById(id);
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
