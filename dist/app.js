"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = __importDefault(require("./logger"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const globalHandler_1 = require("./middleware/ErrorHandlers/globalHandler");
const todo_routes_1 = __importDefault(require("./routes/todo.routes"));
const connection_1 = require("./config/database/connection");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.static("public"));
// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "TESTING TODO API",
            version: "1.0.0",
        },
    },
    apis: ["./src/routes/*.ts"],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
app.get("/", (req, res) => {
    res.status(200).json({
        status: "Success",
        message: "Server is running successfully",
    });
});
app.use("/v1/api/todos", todo_routes_1.default);
app.all("*", (req, res, next) => {
    logger_1.default.error(`Can't find ${req.originalUrl} on the server`);
    res.status(404).json({
        status: "fail",
        message: `Can't find ${req.originalUrl} on the server`,
    });
});
const db = async () => {
    try {
        await connection_1.sequelize.authenticate();
        console.log("Connection has been established successfully.");
    }
    catch (error) {
        console.error("Unable to connect to the database:", error.message);
        logger_1.default.error("Unable to connect to the database:", error);
    }
};
// db();
app.use(globalHandler_1.globalErrorHandler);
exports.default = app;
