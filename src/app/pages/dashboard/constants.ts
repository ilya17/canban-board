import { TaskType } from '@core/services/interfaces';

export const TASK_TYPES: TaskType[] = [
  {
    id: '1',
    type: 'new',
    title: 'Новые',
  },
  {
    id: '2',
    type: 'progress',
    title: 'Выполняются',
  },
  {
    id: '3',
    type: 'ready',
    title: 'Готовы',
  },
];
