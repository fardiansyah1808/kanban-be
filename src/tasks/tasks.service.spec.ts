import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a task', () => {
    const dto: CreateTaskDto = {
      title: 'Task 3',
      description: 'Description 3',
    };
    const task = service.create(dto);
    expect(task.id).toBe(3);
    expect(task.title).toBe(dto.title);
    expect(task.description).toBe(dto.description);
    expect(task.isDeleted).toBe(false);
    expect(service.findAll()).toHaveLength(3);
  });

  it('should create two tasks', () => {
    const dto1: CreateTaskDto = {
      title: 'Task 3',
      description: 'Description 3',
    };
    const dto2: CreateTaskDto = {
      title: 'Task 4',
      description: 'Description 4',
    };
    service.create(dto1);
    expect(service.findAll()).toHaveLength(3);
    service.create(dto2);
    expect(service.findAll()).toHaveLength(4);
  });
});
