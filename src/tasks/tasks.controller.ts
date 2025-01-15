import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller({
  path: 'tasks',
  version: '1',
})
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  async findAll() {
    // await new Promise((resolve) => setTimeout(resolve, 6000));
    return await this.tasksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const task = await this.tasksService.findOne(id);
    if (!task || task.isDeleted) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return task;
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    const task = await this.tasksService.findOne(id);
    if (!task || task.isDeleted) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const task = await this.tasksService.findOne(id);
    if (!task || task.isDeleted) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return this.tasksService.remove(id);
  }
}
