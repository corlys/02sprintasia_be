import type { Request, Response } from "express";
import {
  CreateTodoRequest,
  DeleteTodoRequest,
  GetTodoRequest,
  UpdateTodoRequest,
} from "../dto/request";
import { StatusCodes } from "http-status-codes";
import {
  updateTaskById,
  deleteTaskById,
  getTaskByIdQuery,
  insertTask,
  getTasksQuery,
} from "../services/tasks";

export const createTask = async (req: Request, res: Response) => {
  try {
    const result = CreateTodoRequest.safeParse(req.body);
    if (!result.success)
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "BAD_REQUEST" });
    const { title, description } = result.data;
    await insertTask(title, description);
    return res.status(StatusCodes.OK).json({
      message: "Todo Successfully Created",
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "INTERNAL_SERVER_ERROR",
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const result = DeleteTodoRequest.safeParse(req.body);
    if (!result.success)
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "BAD_REQUEST" });
    const { id } = result.data;
    const deletionResult = await deleteTaskById(id);
    return res.status(StatusCodes.OK).json({
      message: `Successfully deleted task with id ${deletionResult[0].deletedId} cascade`,
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "INTERNAL_SERVER_ERROR",
    });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const result = UpdateTodoRequest.safeParse(req.body);
    if (!result.success)
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "BAD_REQUEST" });
    const { id, title, description, status } = result.data;
    const task = await getTaskByIdQuery(id);
    if (!task)
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "BAD_REQUEST" });
    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    const updateResult = await updateTaskById(id, task);
    return res.status(StatusCodes.OK).json({
      message: `Successfully updated task by id ${updateResult[0].updatedId}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "INTERNAL_SERVER_ERROR",
    });
  }
};

export const getTasks = async (_: Request, res: Response) => {
  try {
    const tasks = await getTasksQuery();
    return res.status(StatusCodes.OK).json({
      tasks,
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "INTERNAL_SERVER_ERROR",
    });
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    const result = GetTodoRequest.safeParse(req.params);
    if (!result.success)
      return res.status(StatusCodes.NOT_FOUND).json({ error: "NOT_FOUND" });
    const { id } = result.data;
    const task = await getTaskByIdQuery(parseInt(id));
    return res.status(StatusCodes.OK).json({
      task,
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "INTERNAL_SERVER_ERROR",
    });
  }
};
