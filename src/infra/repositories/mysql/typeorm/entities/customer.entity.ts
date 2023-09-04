import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { TaskEntity } from './task.entity';

@Entity()
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  first_name: string;

  @Column({ length: 255 })
  last_name: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 255, unique: true })
  phone: string;

  @Column({ length: 255 })
  password: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => TaskEntity, (tasks) => tasks.customer)
  tasks?: TaskEntity[];
}
