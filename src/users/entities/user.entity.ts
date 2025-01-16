import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 128, nullable: false, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Column({ type: 'char', length: 192, nullable: false })
  passwordHash: string;

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
}
