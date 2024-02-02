import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database/connection";

interface TodoAttributes {
  id?: number;
  title: string;
  description?: string;
  completed: boolean;
}
class Todo extends Model<TodoAttributes> implements TodoAttributes {
  public id!: number;
  public title!: string;
  public description?: string;
  public completed: boolean;

  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Todo",
    tableName: "Todos",
  }
);

export default Todo;
