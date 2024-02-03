import express from "express";
import TodoControllers from "../controllers/todo.controllers";
import {
  validateCreateTodo,
  validateUpdateTodo,
} from "../middleware/validation/joiValidation";

const todoRouter = express.Router();

/**
 * @swagger
 * /v1/api/todos:
 *   get:
 *     description: Get all TODOs
 *     responses:
 *       200:
 *         description: Successful response
 */
todoRouter.get("/", TodoControllers.getTodos);

todoRouter.post("/", validateCreateTodo, TodoControllers.createTodo);
todoRouter.patch("/edit/:id", validateUpdateTodo, TodoControllers.updateTodo);
todoRouter.delete("/delete/:id", TodoControllers.deleteTodo);

export default todoRouter;
