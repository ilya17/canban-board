import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Task } from '@core/services/interfaces';
import { TasksService } from '@core/services/tasks.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskModalComponent } from 'src/app/modals/create-task-modal/create-task-modal.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input()
  card!: Task;

  constructor(private tasksService: TasksService, private dialog: MatDialog) {}

  public deleteTask(cardId: string): void {
    this.tasksService.deleteTask(cardId);
  }

  public createDialog(task: Task, flag: string, title: string): void {
    this.dialog.open(CreateTaskModalComponent, {
      width: '692px',
      height: '570px',
      data: {
        title: title,
        flag: flag,
        task: task,
      },
    });
  }
}
