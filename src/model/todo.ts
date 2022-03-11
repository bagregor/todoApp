export class Todo {
    constructor(
      public todo_id: number,
      public todo_user_id: number,
      public todo_label: string,
      public todo_date: string,
      public todo_is_done: number,
    ) {}
  }
  