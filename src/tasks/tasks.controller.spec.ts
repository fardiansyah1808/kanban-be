import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { NotFoundException } from '@nestjs/common';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return empty array of tasks', async () => {
    jest.spyOn(service, 'findAll').mockImplementation(() => [] as Task[]);
    const tasks = await controller.findAll();
    expect(tasks).toEqual([]);
  });

  it('should return all tasks', async () => {
    const tasks: Task[] = [
      new Task(1, 'Task 1', 'Description 1'),
      new Task(2, 'Task 2', 'Description 2'),
    ];

    jest.spyOn(service, 'findAll').mockImplementation(() => tasks);
    const result = await controller.findAll();
    expect(result).toBe(tasks);
  });

  it('should return a task by id', async () => {
    const task: Task = new Task(1, 'Task 1', 'Description 1');
    jest
      .spyOn(service, 'findOne')
      .mockImplementation((id: number): Task | undefined => {
        expect(id).toBe(task.id);
        return task;
      });
    const result: Task | undefined = await controller.findOne(1);
    expect(result).toBe(task);
  });

  it('should return a task by id not found', async () => {
    jest
      .spyOn(service, 'findOne')
      .mockImplementation((id: number): Task | undefined => {
        expect(id).toBe(1);
        return undefined;
      });
    expect(() => controller.findOne(1)).toThrow(NotFoundException);
  });
});
