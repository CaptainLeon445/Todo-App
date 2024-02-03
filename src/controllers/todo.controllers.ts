import { NextFunction, Response, Request } from "express";
import { Get, Route } from "tsoa";
import TodoServices from "../services/todo.services";
import { AppError } from "../middleware/ErrorHandlers/AppError";
import Todo from "../models/todo.model";

interface TodoResponse{
  status: string,
  message: string,
  count: number,
  data: any
}


export default class TodoControllers {
  
  public static async getTodos(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data: Todo[] = await TodoServices.getTodos();
      return res.status(200).json({
        status: "Success",
        message: "Returned all Todos successfully",
        count: data.length,
        data,
      });
    } catch (error: any) {
      next(new AppError(error.message, error.statusCode));
    }
  }

  /**
   * createTodo
   */
  public static async createTodo(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { title, description } = req.body;
      const obj: { [key: string]: any } = { title, description };
      const data = await TodoServices.createTodo(obj);
      return res.status(201).json({
        status: "success",
        message: "Create new todo successfully.",
        data,
      });
    } catch (error: any) {
      return next(new AppError(error.message, 500));
    }
  }

  /**
   * updateTodo
   */
  public static async updateTodo(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { title, description, completed } = req.body;
      const id: number = parseInt(req.params.id);
      const obj: { [key: string]: any } = { title, description };
      const data = await TodoServices.updateTodo(id, obj);
      if (data[0] === 1)
        return res.status(201).json({
          status: "Success",
          message: "Todo updated successfully",
          data,
        });
      else
        return res.status(404).json({
          status: "fail",
          message: "Todo not found",
        });
    } catch (error: any) {
      return next(new AppError(error.message, 500));
    }
  }

  /**
   * deleteTodo
   */
  public static async deleteTodo(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id: number = parseInt(req.params.id);
      const data = await TodoServices.deleteTodo(id);
      if (data[0] === 1)
        return res.status(204).json({
          status: "Success",
          message: "Todo deleted successfully",
          data,
        });
      else
        return res.status(404).json({
          status: "fail",
          message: "Todo not found",
        });
    } catch (error: any) {
      next(new AppError(error.message, error.statusCode));
    }
  }
}
