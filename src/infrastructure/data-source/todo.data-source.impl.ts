import { prisma } from "../../data/postgresql";
import { CreateTodoDto, TodoDataSource, TodoEntity, UpdateTodoDto } from "../../domain";

export class TodoDataSourceImpl implements TodoDataSource {
  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const newTodo = await prisma.todo.create({
      data: createTodoDto,
    });

    return TodoEntity.fromObject(newTodo);
  }
  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();
    return todos.map((todo) => TodoEntity.fromObject(todo));
  }
  async getById(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findFirst({
      where: {
        id,
      },
    });
    if (!todo) {
      throw new Error("Todo not found");
    }
    return TodoEntity.fromObject(todo);
  }
  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    await this.getById(id);
    console.log(updateTodoDto.data)
    const updatedTodo = await prisma.todo.update({
      where: {
        id,
      },
      data: updateTodoDto.data,
    });
    return TodoEntity.fromObject(updatedTodo);
  }
  async delete(id: number): Promise<TodoEntity> {
    await this.getById(id);

    const deleted = await prisma.todo.delete({
      where: {
        id,
      },
    });

    return TodoEntity.fromObject(deleted);
  }
}
