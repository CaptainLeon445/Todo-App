"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateTodo = exports.validateCreateTodo = void 0;
const joi_1 = __importDefault(require("joi"));
const validateCreateTodo = () => {
    const schema = joi_1.default.object({
        title: joi_1.default.string().min(4).max(50).required(),
        description: joi_1.default.string().max(1500),
        completed: joi_1.default.boolean().required(),
    });
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req.body, { abortEarly: false });
            next();
        }
        catch (error) {
            res
                .status(400)
                .json({ error: error.details.map((detail) => detail.message) });
        }
    };
};
exports.validateCreateTodo = validateCreateTodo;
const validateUpdateTodo = () => {
    const schema = joi_1.default.object({
        title: joi_1.default.string().min(4).max(50),
        description: joi_1.default.string().max(1500),
        completed: joi_1.default.boolean(),
    });
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req.body, { abortEarly: false });
            next();
        }
        catch (error) {
            res
                .status(400)
                .json({ error: error.details.map((detail) => detail.message) });
        }
    };
};
exports.validateUpdateTodo = validateUpdateTodo;
