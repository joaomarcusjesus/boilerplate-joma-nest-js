import { TaskStatusEnum } from '../enums/task-status.enum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CustomerEntity } from './customer.entity';

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column('text')
  description: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column()
  status: TaskStatusEnum;

  @Column({
    name: 'customer_id',
  })
  customer_id?: number;

  @ManyToOne(() => CustomerEntity, (customer) => customer.tasks, {
    nullable: true,
  })
  @JoinColumn({ name: 'customer_id' })
  customer?: CustomerEntity;
}
