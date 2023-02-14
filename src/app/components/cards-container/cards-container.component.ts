import { Component, Input } from '@angular/core';
import { Task, TaskType } from '@core/services/interfaces';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TasksService } from '@core/services/tasks.service';
import { TaskTypes, TypeIds } from '@core/services/constants';

@Component({
  selector: 'app-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.scss'],
})
export class CardsContainerComponent {
  @Input()
  taskType!: TaskType;

  @Input() cards: any;

  constructor(private tasksService: TasksService) {}

  public drop(event: CdkDragDrop<Task[]>): void {
    let movedItem: Task;

    const newContainerId = event.container.id;
    const data = event.container.data;

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      switch (newContainerId) {
        case TypeIds.progress:
          movedItem = this.handleItemPlaceChange('progress', data);
          break;
        case TypeIds.new:
          movedItem = this.handleItemPlaceChange('new', data);
          break;
        default:
          movedItem = this.handleItemPlaceChange('ready', data);
          break;
      }
      this.tasksService.updateTasks(movedItem);
    }
  }

  private handleItemPlaceChange(
    type: keyof typeof TaskTypes,
    arr: Task[]
  ): Task {
    let movedItem = arr[arr.findIndex((item) => item.type !== type)];
    movedItem.type = type;
    return movedItem;
  }
}
