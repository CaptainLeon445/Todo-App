import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import logger from "./logger";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { globalErrorHandler } from "./middleware/ErrorHandlers/globalHandler";
import todoRouter from "./routes/todo.routes";
import { sequelize } from "./config/database/connection";

const app: Application = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));

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

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "Success",
    message: "Server is running successfully",
  });
});
app.use("/v1/api/todos", todoRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  logger.error(`Can't find ${req.originalUrl} on the server`);
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on the server`,
  });
});
const db = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
    logger.error("Unable to connect to the database:", error);
  }
};
// db();
app.use(globalErrorHandler);

export default app;
