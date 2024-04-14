import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDataSourceImpl } from "../../infrastructure/data-source/todo.data-source.impl";
import { TodoRepositoryImpl } from "../../infrastructure/repositories/todo.repository.impl";

export class TodosRoutes {
  static get routes(): Router {
    const router = Router();
    const dataSource = new TodoDataSourceImpl();
    const todoRepository = new TodoRepositoryImpl(dataSource);
    const todosController = new TodosController(todoRepository);

    router.get("/", todosController.getTodos);
    router.post("/", todosController.createTodo);
    router.get("/:id", todosController.getTodoById);
    router.put("/:id", todosController.updateTodo);
    router.delete("/:id", todosController.deleteTodo);

    return router;
  }
}
