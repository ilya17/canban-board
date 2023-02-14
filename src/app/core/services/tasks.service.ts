import { Injectable } from '@angular/core';
import { Task } from './interfaces';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  public tasks$: Observable<Task[]>;

  public tasksSubject$ = new BehaviorSubject<Task[]>([]);

  constructor() {
    this.tasks$ = this.tasksSubject$.asObservable();
    this.updateTasksList();
  }

  public updateTasks(updateTask: Task): void {
    const tasks = this.tasksSubject$.value;
    const index = tasks.findIndex((item) => item.id === updateTask.id);
    if (index > -1) {
      tasks.splice(index, 1);
      tasks.push(updateTask);
      this.tasksSubject$.next(tasks);
    }
    this.updateLocalStorage();
  }

  public addTask(task: Task): void {
    const tasks = this.tasksSubject$.value;
    tasks.push(task);
    this.tasksSubject$.next(tasks);
    this.updateLocalStorage();
  }

  public deleteTask(id: string): void {
    const tasks = this.tasksSubject$.value;
    const index = tasks.findIndex((item) => item.id === id);
    if (index > -1) {
      tasks.splice(index, 1);
      this.tasksSubject$.next(tasks);
    }
    this.updateLocalStorage();
  }

  private updateLocalStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasksSubject$.value));
  }

  private updateTasksList(): void {
    if (this.tasksSubject$.value.length) {
      this.updateLocalStorage();
    } else {
      if (localStorage.getItem('tasks')) {
        const tasks = localStorage.getItem('tasks');
        if (tasks?.length) {
          this.tasksSubject$.next(JSON.parse(tasks));
        }
      }
    }
  }
}
