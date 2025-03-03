import { CreateTodoDto, UpdateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";

export abstract class TodoDataSource {
  abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>;

  // todo: add pagination
  abstract getAll(): Promise<TodoEntity[]>;

  abstract getById(id: number): Promise<TodoEntity>;

  abstract update(
    id: number,
    updateTodoDto: UpdateTodoDto
  ): Promise<TodoEntity>;

  abstract delete(id: number): Promise<TodoEntity>;
}
