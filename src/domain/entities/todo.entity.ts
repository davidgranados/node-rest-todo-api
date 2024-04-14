export class TodoEntity {
  constructor(
    public id: number,
    public name: string,
    public completedAt?: Date | null
  ) {}

  get isCompleted() {
    return !!this.completedAt;
  }

  public static fromObject(obj: { [key: string]: any }) {
    const { id, name, completedAt } = obj;
    if (!id) {
      throw new Error("Id is required");
    }
    if (!name) {
      throw new Error("Name is required");
    }
    let completedAtDate: Date | null = null;
    if (completedAt) {
      completedAtDate = new Date(completedAt);
      if (isNaN(completedAtDate.getTime())) {
        throw new Error("Invalid date");
      }
    }

    return new TodoEntity(id, name, completedAtDate);
  }
}
