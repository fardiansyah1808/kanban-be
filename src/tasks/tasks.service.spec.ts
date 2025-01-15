import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('TasksService', () => {
  let service: TasksService;
  let repository: Repository<Task>;

  const dto: CreateTaskDto = {
    title: 'Task 3',
    description: 'Description 3',
  };

  const task = new Task(0, dto.title, dto.description);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: getRepositoryToken(Task), useClass: Repository<Task> },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined repository', () => {
    expect(repository).toBeDefined();
  });

  it('should create a task', async () => {
    jest
      .spyOn(repository, 'save')
      .mockImplementation((_: Task) => Promise.resolve(task));

    expect(service.create(dto)).resolves.toEqual(task);
  });

  it('should create two tasks', () => {
    jest
      .spyOn(repository, 'findOneBy')
      .mockImplementation(
        (filter: { id: number; isDeleted: boolean }): Promise<Task> => {
          expect(filter.id).toBe(task.id);
          expect(filter.isDeleted).toBe(false);
          return Promise.resolve(
            filter.id === 1 ? new Task(1, 'Task 1', 'Description 1') : null,
          );
        },
      );

    expect(service.findOne(task.id)).resolves.toEqual(task);
    expect(service.findAll()).resolves.toEqual([task]);
  });
});
