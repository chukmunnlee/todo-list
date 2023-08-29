import { Component, inject, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Task, Todo} from '../store/models';
import {TodoRepository} from '../store/todo.repository';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  private fb = inject(FormBuilder)
  private router = inject(Router)
  private todoRepo = inject(TodoRepository)

  todo!: FormGroup
  tasks!: FormArray

  ngOnInit(): void {
    this.todo = this.createTodo()
  }

  process() {
    const value: any = this.todo.value
    console.info('>>> value: ', value)
    const todo: Todo = {
      title: value['title'],
      completeBy: (new Date(value['completeBy'])).getTime(),
      tasks: value['tasks'] as Task[]
    }
    this.todoRepo.insertTodo(todo)
      .then(() => this.router.navigate(['/']))
      .catch(error => alert(`Insert error: ${JSON.stringify(error)}`))
  }

  addTask() {
    this.tasks.push(this.createTask())
  }
  removeTask(idx: number) {
    this.tasks.removeAt(idx)
  }

  invalid(): boolean {
    return this.todo.invalid || (this.tasks.controls.length <= 0)
  }

  private createTask(): FormGroup {
    return this.fb.group({
      task: this.fb.control<string>('', [ Validators.required ]),
      priority: this.fb.control<string>('me')
    })
  }

  private createTodo(): FormGroup {
    this.tasks = this.fb.array([])
    return this.fb.group({
      title: this.fb.control<string>('', [ Validators.required ]),
      completeBy: this.fb.control<number>((new Date()).getTime(), [ Validators.required ]),
      tasks: this.tasks
    })
  }

}
