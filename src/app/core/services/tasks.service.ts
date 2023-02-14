import { Injectable } from '@angular/core';
import { Task } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  public tasks: Task[] = [];
  public newTasks: Task[] = [];
  public progressTasks: Task[] = [];
  public readyTasks: Task[] = [];

  constructor() {
    this.updateTasksList();
  }

  public getCardsByType(type: string): Task[] {
    switch (type) {
      case 'new':
        return this.newTasks;
      case 'progress':
        return this.progressTasks;
      default:
        return this.readyTasks;
    }
  }

  public updateTasks(task: Task): void {
    this.tasks.forEach((item) => {
      if (item.id === task.id) {
        item.type = task.type;
      }
    });
    this.updateTasksList();
  }

  public addTask(task: Task): void {
    this.tasks.push(task);
    this.updateTasksList();
  }

  public editTask(task: Task): void {
    const index = this.tasks.findIndex((item) => item.id === task.id);
    this.tasks[index] = task;
    this.updateTasksList();
  }

  public deleteTask(id: string): void {
    this.tasks = this.tasks.filter((item) => item.id !== id);
    this.updateTasksList();
  }

  private sortTasks(): void {
    this.newTasks = this.tasks.filter((task) => task.type === 'new');
    this.progressTasks = this.tasks.filter((task) => task.type === 'progress');
    this.readyTasks = this.tasks.filter((task) => task.type === 'ready');
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  private updateTasksList(): void {
    if (this.tasks.length) {
      this.sortTasks();
    } else {
      if (localStorage.getItem('tasks')) {
        const tasks = localStorage.getItem('tasks');
        if (tasks && tasks.length) {
          this.tasks = JSON.parse(tasks);
          this.sortTasks();
        }
      }
    }
  }
}
