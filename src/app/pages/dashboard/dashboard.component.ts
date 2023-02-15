import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TASK_TYPES } from './constants';
import { TaskType } from '@core/services/interfaces';
import { TasksService } from '@core/services/tasks.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskModalComponent } from 'src/app/modals/create-task-modal/create-task-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  get taskTypes(): TaskType[] {
    return TASK_TYPES;
  }

  public tasks$ = this.tasksService.tasks$;

  constructor(private tasksService: TasksService, private dialog: MatDialog) {}

  public createTask(): void {
    this.dialog.open(CreateTaskModalComponent, {
      width: '692px',
      height: '570px',
      data: {
        title: 'Новая задача',
        flag: 'create',
      },
    });
  }
}
