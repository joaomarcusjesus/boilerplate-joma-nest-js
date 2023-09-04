import { DataSource } from 'typeorm';
import { CustomerEntity } from '../entities/customer.entity';
import { TaskEntity } from '../entities/task.entity';

export const providers = [
  {
    provide: 'CUSTOMER_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CustomerEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'TASK_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TaskEntity),
    inject: ['DATA_SOURCE'],
  },
];
