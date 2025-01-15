import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export const TASK_STATUS = ['TODO', 'ON_PROGRESS', 'DONE', 'ARCHIVED'] as const;

export type TaskStatus = (typeof TASK_STATUS)[number];

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 40, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  description: string;

  @Column({ type: 'enum', enum: TASK_STATUS, default: 'TODO' })
  status: TaskStatus;

  @Column({ type: 'bigint', nullable: false, name: 'owner_id' })
  ownerId: number;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
    name: 'is_deleted',
  })
  isDeleted: boolean;

  @Column({
    type: 'bigint',
    nullable: false,
    default: Date.now(),
    name: 'created_at',
  })
  createdAt: number; // unix timestamp in milliseconds

  @Column({
    type: 'bigint',
    nullable: false,
    default: Date.now(),
    name: 'updated_at',
  })
  updatedAt: number; // unix timestamp in milliseconds

  constructor(
    id: number,
    title: string,
    description: string,
    ownerId: number = 1,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = 'TODO';
    this.ownerId = ownerId;
    this.isDeleted = false;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }
}
