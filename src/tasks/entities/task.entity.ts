export const TASK_STATUS = ['TODO', 'ON_PROGRESS', 'DONE', 'ARCHIVED'] as const;

export type TaskStatus = (typeof TASK_STATUS)[number];

export class Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  ownerId: number;
  isDeleted: boolean;
  createdAt: number; // unix timestamp in milliseconds
  updatedAt: number; // unix timestamp in milliseconds

  constructor(id: number, title: string, description: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = 'TODO';
    this.ownerId = 1;
    this.isDeleted = false;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }
}
