import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { TaskStatus, TASK_STATUS } from '../entities/task.entity';
import { IsIn, IsOptional } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsIn(TASK_STATUS)
  @IsOptional()
  status?: TaskStatus;
}
