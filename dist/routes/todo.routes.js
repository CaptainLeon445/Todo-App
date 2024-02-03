"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todo_controllers_1 = __importDefault(require("../controllers/todo.controllers"));
const joiValidation_1 = require("../middleware/validation/joiValidation");
const todoRouter = express_1.default.Router();
/**
 * @swagger
 * /v1/api/todos:
 *   get:
 *     description: Get all TODOs
 *     responses:
 *       200:
 *         description: Successful response
 */
todoRouter.get("/", todo_controllers_1.default.getTodos);
todoRouter.post("/", joiValidation_1.validateCreateTodo, todo_controllers_1.default.createTodo);
todoRouter.patch("/edit/:id", joiValidation_1.validateUpdateTodo, todo_controllers_1.default.updateTodo);
todoRouter.delete("/delete/:id", todo_controllers_1.default.deleteTodo);
exports.default = todoRouter;
