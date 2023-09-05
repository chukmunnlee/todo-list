import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main.component';
import { AddTaskComponent } from './components/add-task.component';
import {TodosRepository} from './store/todos.repository';

const appRoutes: Routes = [
  { path: '', component: MainComponent, title: 'Todo List' },
  { path: 'add', component: AddTaskComponent, title: 'Add Tasks' },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AddTaskComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  providers: [ TodosRepository ],
  bootstrap: [AppComponent]
})
export class AppModule { }
