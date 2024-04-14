import { Request, Response } from "express";

import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";

export class TodosController {
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll();
    return res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    try {
      const todo = await this.todoRepository.getById(id);
      return res.json(todo);
    } catch (error: any) {
      return res.status(404).json({ message: "Todo not found" });
    }
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) {
      return res.status(400).json({ message: error });
    }

    if (!createTodoDto) {
      return res.status(500).json({ message: "Failed to create todo" });
    }

    const newTodo = await this.todoRepository.create(createTodoDto);

    return res.status(201).json(newTodo);
  };

  public updateTodo = async (req: Request, res: Response) => {
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

    try {
      const updatedTodo = await this.todoRepository.update(id, updateTodoDto);
      return res.json(updatedTodo);
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    try {
      const deleted = await this.todoRepository.delete(id);
      return res.json(deleted);
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  };
}
