import { NextFunction } from "express";
import Todo from "../models/todo.model";
import TodoUtils from "./todoUtils.services";
import { AppError } from "../middleware/ErrorHandlers/AppError";
import { where } from "sequelize";

export default class TodoServices{

    /**
     * getTodos
     */
    public static async getTodos() {
        const tt = [1,2,34,45,5]
        const data = await Todo.findAll();
        return data
    }

    /**
     * createTodo
     */
    public static async createTodo(body: {[key: string]: any}){
        const data = await Todo.create(body)
        return data
    }

    /**
     * updateTodo
     */
    public static async updateTodo(id:number, body: {[key: string]: any}) {
        const obj = await Todo.update(body, {where:{id}})
        return obj  
    }

    /**
     * deleteTodo
     */
    public static async deleteTodo(id:number) {
        const obj = await Todo.destroy({where:{id}})
        return obj  
    }
}