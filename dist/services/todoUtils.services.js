"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todo_model_1 = __importDefault(require("../models/todo.model"));
class TodoUtils {
    /**
     * getTodoByID
     */
    static async getTodoById(id) {
        const data = await todo_model_1.default.findOne({ where: { id } });
        return data;
    }
}
exports.default = TodoUtils;
