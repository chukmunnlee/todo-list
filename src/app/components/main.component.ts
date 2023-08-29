import { Component, inject, OnInit } from '@angular/core';

import { TodoRepository } from '../store/todo.repository'
import { TodoSummary } from '../store/models'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private todoRepo = inject(TodoRepository)

  todos$!: Promise<TodoSummary[]>

  ngOnInit(): void {
    this.todos$ = this.todoRepo.getTasks()
  }

  deleteTodo(id: string) {
    this.todos$ = this.todoRepo.deleteTask(id)
      .then(() => this.todoRepo.getTasks())
  }

}
