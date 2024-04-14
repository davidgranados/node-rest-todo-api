import { Request, Response } from "express";

import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import {
  GetAllTodosUseCaseImpl,
  GetTodoByIdUseCaseImpl,
  CreateTodoUseCaseImpl,
  UpdateTodoUseCaseImpl,
  DeleteTodoUseCaseImpl,
  TodoRepository,
} from "../../domain";

export class TodosController {
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = (req: Request, res: Response) => {
    new GetAllTodosUseCaseImpl(this.todoRepository)
      .execute()
      .then((todos) => {
        return res.json(todos);
      })
      .catch((error: any) => {
        return res.status(500).json({ message: error.message });
      });
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    new GetTodoByIdUseCaseImpl(this.todoRepository)
      .execute(id)
      .then((todo) => {
        return res.json(todo);
      })
      .catch((error: any) => {
        return res.status(404).json({ message: error.message });
      });
  };

  public createTodo = (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) {
      return res.status(400).json({ message: error });
    }

    if (!createTodoDto) {
      return res.status(500).json({ message: "Failed to create todo" });
    }

    new CreateTodoUseCaseImpl(this.todoRepository)
      .execute(createTodoDto)
      .then((todo) => {
        return res.json(todo);
      })
      .catch((error: any) => {
        return res.status(500).json({ message: error.message });
      });
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const [error, updateTodoDto] = UpdateTodoDto.create(req.body);

    if (error) {
      return res.status(400).json({ message: error });
    }

    if (!updateTodoDto) {
      return res.status(500).json({ message: "Failed to update todo" });
    }

    new UpdateTodoUseCaseImpl(this.todoRepository)
      .execute(id, updateTodoDto)
      .then((todo) => {
        return res.json(todo);
      })
      .catch((error: any) => {
        return res.status(404).json({ message: error.message });
      });
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    new DeleteTodoUseCaseImpl(this.todoRepository)
      .execute(id)
      .then((deletedTodo) => {
        return res.json(deletedTodo);
      })
      .catch((error: any) => {
        return res.status(404).json({ message: error.message });
      });
  };
}
