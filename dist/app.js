"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = __importDefault(require("./logger"));
const globalHandler_1 = require("./middleware/ErrorHandlers/globalHandler");
const todo_routes_1 = __importDefault(require("./routes/todo.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.get("/", (req, res) => {
    res.status(200).json({
        status: "Success",
        message: "Server is running successfully",
    });
});
app.use("/v1/api/todoss", todo_routes_1.default);
app.all("*", (req, res, next) => {
    logger_1.default.error(`Can't find ${req.originalUrl} on the server`);
    res.status(404).json({
        status: "fail",
        message: `Can't find ${req.originalUrl} on the server`,
    });
});
app.use(globalHandler_1.globalErrorHandler);
exports.default = app;
