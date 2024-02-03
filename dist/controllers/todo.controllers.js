"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todo_services_1 = __importDefault(require("../services/todo.services"));
const AppError_1 = require("../middleware/ErrorHandlers/AppError");
class TodoControllers {
    static async getTodos(req, res, next) {
        try {
            const data = await todo_services_1.default.getTodos();
            return res.status(200).json({
                status: "Success",
                message: "Returned all Todos successfully",
                count: data.length,
                data,
            });
        }
        catch (error) {
            next(new AppError_1.AppError(error.message, error.statusCode));
        }
    }
    /**
     * createTodo
     */
    static async createTodo(req, res, next) {
        try {
            const { title, description } = req.body;
            const obj = { title, description };
            const data = await todo_services_1.default.createTodo(obj);
            return res.status(201).json({
                status: "success",
                message: "Create new todo successfully.",
                data,
            });
        }
        catch (error) {
            return next(new AppError_1.AppError(error.message, 500));
        }
    }
    /**
     * updateTodo
     */
    static async updateTodo(req, res, next) {
        try {
            const { title, description, completed } = req.body;
            const id = parseInt(req.params.id);
            const obj = { title, description };
            const data = await todo_services_1.default.updateTodo(id, obj);
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
        }
        catch (error) {
            return next(new AppError_1.AppError(error.message, 500));
        }
    }
    /**
     * deleteTodo
     */
    static async deleteTodo(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            const data = await todo_services_1.default.deleteTodo(id);
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
        }
        catch (error) {
            next(new AppError_1.AppError(error.message, error.statusCode));
        }
    }
}
exports.default = TodoControllers;
