import Todo from "../models/todo.model";

export default class TodoUtils{

    /**
     * getTodoByID
     */
    public static async getTodoById(id:number) {
        const data = await Todo.findOne({where: {id}});
        return data
    }

}