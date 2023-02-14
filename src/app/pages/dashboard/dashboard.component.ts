import { Component } from '@angular/core';
import { TASK_TYPES } from './constants';
import { Task, TaskType } from '@core/services/interfaces';
import { TasksService } from '@core/services/tasks.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskModalComponent } from 'src/app/modals/create-task-modal/create-task-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  get taskTypes(): TaskType[] {
    return TASK_TYPES;
  }

  constructor(private tasksService: TasksService, private dialog: MatDialog) {}

  public getCards(type: string): Task[] {
    return this.tasksService.getCardsByType(type);
  }

  public createTask(): void {
    const dialogRef = this.dialog.open(CreateTaskModalComponent, {
      width: '692px',
      height: '570px',
      data: {
        title: 'Новая задача',
        flag: 'create',
      },
    });
  }
}