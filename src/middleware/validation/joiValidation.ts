import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validateCreateTodo = () => {
  const schema: Joi.ObjectSchema = Joi.object({
    title: Joi.string().min(4).max(50).required(),
    description: Joi.string().max(1500),
    completed: Joi.boolean().required(),
  });
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      res
        .status(400)
        .json({ error: error.details.map((detail: any) => detail.message) });
    }
  };
};

export const validateUpdateTodo = () => {
  const schema: Joi.ObjectSchema = Joi.object({
    title: Joi.string().min(4).max(50),
    description: Joi.string().max(1500),
    completed: Joi.boolean(),
  });
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      res
        .status(400)
        .json({ error: error.details.map((detail: any) => detail.message) });
    }
  };
};
