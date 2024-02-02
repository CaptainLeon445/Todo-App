"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const AppError_1 = require("./AppError");
const globalErrorHandler = (err, req, res, next) => {
    console.error("Error: ", err);
    if (err instanceof AppError_1.AppError)
        return res
            .status(err.statusCode)
            .json({ status: "error", message: err.message });
    return res
        .status(500)
        .json({ status: "error", message: "Something went wrong." });
};
exports.globalErrorHandler = globalErrorHandler;
