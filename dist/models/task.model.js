"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../config/database/connection");
class Task extends sequelize_1.Model {
}
Task.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
    },
    completed: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize: connection_1.sequelize,
    modelName: "Task",
    tableName: "Tasks",
});
exports.default = Task;
