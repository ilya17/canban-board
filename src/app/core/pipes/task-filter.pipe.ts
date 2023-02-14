import { Pipe, PipeTransform } from '@angular/core';
import { TaskTypes } from '@core/services/constants';
import { Task } from '@core/services/interfaces';

@Pipe({
  name: 'taskFilter',
  pure: false,
})
export class TaskFilterPipe implements PipeTransform {
  public transform(
    tasks: Task[] | null,
    taskType: keyof typeof TaskTypes
  ): Task[] {
    return (tasks || []).filter((item) => item.type === taskType);
  }
}
