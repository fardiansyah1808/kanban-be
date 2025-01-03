import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: 1,
      title: 'Task 1',
      description: 'Description 1',
      status: 'TODO',
      ownerId: 1,
      isDeleted: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Description 2',
      status: 'ON_PROGRESS',
      ownerId: 2,
      isDeleted: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  ];

  create(createTaskDto: CreateTaskDto) {
    const nextId = Math.max(...this.tasks.map((task) => task.id)) + 1;
    const newTask = new Task(
      nextId,
      createTaskDto.title,
      createTaskDto.description,
    );
    this.tasks.push(newTask);

    return newTask;
  }

  findAll() {
    return this.tasks;
  }

  findOne(id: number): Task | undefined {
    const task = this.tasks.find((task) => task.id === id && !task.isDeleted);

    return task;
  }

  update(id: number, updateTaskDto: UpdateTaskDto): Task | undefined {
    const task = this.findOne(id);

    if (updateTaskDto.title) {
      task.title = updateTaskDto.title;
    }
    if (updateTaskDto.description) {
      task.description = updateTaskDto.description;
    }
    if (updateTaskDto.status) {
      task.status = updateTaskDto.status;
    }
    task.updatedAt = Date.now();

    return task;
  }

  remove(id: number): Task | undefined {
    const task = this.findOne(id);

    task.isDeleted = true;

    return task;
  }
}
