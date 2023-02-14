import { TaskTypes } from './constants';

export interface Task extends TaskType {
  description: string;
}

export interface TaskType {
  id: string;
  title: string;
  type: keyof typeof TaskTypes;
}
