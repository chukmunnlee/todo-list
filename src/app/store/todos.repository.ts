import {Injectable} from "@angular/core";
import Dexie from 'dexie'
import {ulid} from "ulid";
import {Todo, TodoSummary} from "./models";

@Injectable()
export class TodosRepository extends Dexie {

  todos: Dexie.Table<Todo, string>

  constructor() {
    super("todos")
    this.version(1).stores({
      todos: 'id, completeBy'
    })
    this.todos = this.table('todos')
  }

  insertTodo(td: Todo): Promise<Todo> {
    const _td: Todo = {
      id: ulid(),
      date: (new Date()).getDay(),
      title: td.title,
      completeBy: td.completeBy,
      tasks: [ ...td.tasks ]
    }

    return this.todos.add(_td)
        .then(() => _td)
  }

  getTasks(): Promise<Todo[]> {
    return this.todos.orderBy('completeBy')
        .toArray()
  }

  getTaskSummaries(): Promise<TodoSummary[]> {
    return this.todos.orderBy('completeBy').reverse()
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
    return this.todos.delete(id).then(() => id)
  }

}
