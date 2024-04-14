export class CreateTodoDto {
  private constructor(public readonly name: string) {}

  static create(props: { [key: string]: any }): [string?, CreateTodoDto?] {
    const { name } = props;

    if (!name) {
      return ["Name is required", undefined];
    }

    return [undefined, new CreateTodoDto(name)];
  }
}

export class UpdateTodoDto {
  private constructor(
    public readonly name?: string,
    public readonly completedAt?: Date
  ) {}

  get data(): { [key: string]: any } {
    const data: { [key: string]: any } = {};

    if (this.name) {
      data.name = this.name;
    }

    if (this.completedAt) {
      data.completedAt = this.completedAt;
    }

    return data;
  }

  static create(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
    const { name, completedAt } = props;

    let completedAtDate: Date | undefined;

    if (!name && !completedAt) {
      return ["Name or completedAt is required", undefined];
    }

    if (completedAt) {
      completedAtDate = new Date(completedAt);
      if (isNaN(completedAtDate.getTime())) {
        return ["Invalid completedAt", undefined];
      }
    }

    return [undefined, new UpdateTodoDto(name, completedAtDate)];
  }
}
