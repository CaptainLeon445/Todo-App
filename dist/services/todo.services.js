"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todo_model_1 = __importDefault(require("../models/todo.model"));
class TodoServices {
    /**
     * getTodos
     */
    static async getTodos() {
        const tt = [1, 2, 34, 45, 5];
        // const data = await Todo.findAll();
        return tt;
    }
    /**
     * createTodo
     */
    static async createTodo(body) {
        const data = await todo_model_1.default.create(body);
        return data;
    }
    /**
     * updateTodo
     */
    static async updateTodo(id, body) {
        const obj = await todo_model_1.default.update(body, { where: { id } });
        return obj;
    }
    /**
     * deleteTodo
     */
    static async deleteTodo(id) {
        const obj = await todo_model_1.default.destroy({ where: { id } });
        return obj;
    }
}
exports.default = TodoServices;
