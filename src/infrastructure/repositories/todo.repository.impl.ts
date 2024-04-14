import {
  CreateTodoDto,
  TodoDataSource,
  TodoEntity,
  TodoRepository,
  UpdateTodoDto,
} from "../../domain";

export class TodoRepositoryImpl implements TodoRepository {
  constructor(private readonly dataSource: TodoDataSource) {}
  create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.dataSource.create(createTodoDto);
  }
  getAll(): Promise<TodoEntity[]> {
    return this.dataSource.getAll();
  }
  getById(id: number): Promise<TodoEntity> {
    return this.dataSource.getById(id);
  }
  update(id: number, updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    return this.dataSource.update(id, updateTodoDto);
  }
  delete(id: number): Promise<TodoEntity> {
    return this.dataSource.delete(id);
  }
}
