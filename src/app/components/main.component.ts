import { Component, inject, OnInit } from '@angular/core';

import { TodosRepository } from '../store/todos.repository'
import { TodoSummary } from '../store/models'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private todosRepo = inject(TodosRepository)

  todos$!: Promise<TodoSummary[]>

  ngOnInit(): void {
    this.todos$ = this.todosRepo.getTaskSummaries()
  }

  deleteTodo(id: string) {
    this.todos$ = this.todosRepo.deleteTask(id)
      .then(() => this.todosRepo.getTaskSummaries())
  }

}
