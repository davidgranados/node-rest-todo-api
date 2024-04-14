import { CreateTodoDto, UpdateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities";
import { TodoRepository } from "../../repositories";

export interface CreateTodoUseCase {
  execute(createTodoDto: CreateTodoDto): Promise<TodoEntity>;
}

export class CreateTodoUseCaseImpl implements CreateTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  async execute(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.repository.create(createTodoDto);
  }
}

export interface UpdateTodoUseCase {
  execute(id: number, updateTodoDto: UpdateTodoDto): Promise<TodoEntity>;
}

export class UpdateTodoUseCaseImpl implements UpdateTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  async execute(id: number, updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    return this.repository.update(id, updateTodoDto);
  }
}

export interface DeleteTodoUseCase {
  execute(id: number): Promise<TodoEntity>;
}

export class DeleteTodoUseCaseImpl implements DeleteTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  async execute(id: number): Promise<TodoEntity> {
    return this.repository.delete(id);
  }
}

export interface GetAllTodosUseCase {
  execute(): Promise<TodoEntity[]>;
}

export class GetAllTodosUseCaseImpl implements GetAllTodosUseCase {
  constructor(private readonly repository: TodoRepository) {}

  async execute(): Promise<TodoEntity[]> {
    return this.repository.getAll();
  }
}

export interface GetTodoByIdUseCase {
  execute(id: number): Promise<TodoEntity>;
}

export class GetTodoByIdUseCaseImpl implements GetTodoByIdUseCase {
  constructor(private readonly repository: TodoRepository) {}

  async execute(id: number): Promise<TodoEntity> {
    return this.repository.getById(id);
  }
}
