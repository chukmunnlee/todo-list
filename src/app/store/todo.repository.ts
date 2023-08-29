import {Injectable} from "@angular/core";
import Dexie from 'dexie'
import {ulid} from "ulid";
import {Todo, TodoSummary} from "./models";

@Injectable()
export class TodoRepository extends Dexie {

  todo: Dexie.Table<Todo, string>

  constructor() {
    super("todo")
    this.version(1).stores({
      todo: 'id, completeBy'
    })
    this.todo = this.table('todo')
  }

  insertTodo(td: Todo): Promise<Todo> {
    const _td: Todo = {
      id: ulid(),
      date: (new Date()).getDay(),
      title: td.title,
      completeBy: td.completeBy,
      tasks: [ ...td.tasks ]
    }

    return this.todo.add(_td)
        .then(() => _td)
  }

  getTasks(): Promise<TodoSummary[]> {
    return this.todo.orderBy('completeBy').reverse()
        .toArray()
        .then(
          todos => todos.map(t =>
            ({
              id: t.id,
              title: t.title,
              completeBy: t.completeBy,
              tasksCount: t.tasks.length
            }) as TodoSummary
          )
        )
  }

  deleteTask(id: string): Promise<string> {
    return this.todo.delete(id).then(() => id)
  }

}
