import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  create(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = new Task(0, createTaskDto.title, createTaskDto.description);

    return this.taskRepository.save(newTask);
  }

  findAll(): Promise<Task[]> {
    return this.taskRepository.find({ where: { isDeleted: false } });
  }

  findOne(id: number): Promise<Task> {
    // Using error database
    // return this.taskRepository.findOneOrFail({
    //   where: { id, isDeleted: false },
    // });
    return this.taskRepository.findOne({
      where: { id, isDeleted: false },
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);

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

    return this.taskRepository.save(task);
  }

  async remove(id: number): Promise<Task> {
    const task = await this.findOne(id);

    task.isDeleted = true;
    task.updatedAt = Date.now();

    return this.taskRepository.save(task);
  }
}
