import { PgTaskRepository } from '@/infra/repositories/mysql/typeorm/Tasks/Task-repository';
import { providers } from '@/infra/repositories/mysql/typeorm/helpers/repository-providers';
import {
  CreateTaskRepository,
  DeleteTaskRepository,
  FindTaskRepository,
  ListTaskRepository,
  UpdateTaskRepository,
} from '@/use-cases/contracts/repository/tasks';
import { Module } from '@nestjs/common';
import { TypeormDatabaseModule } from '../../../infra/repositories/mysql/typeorm/typeorm.module';

@Module({
  imports: [TypeormDatabaseModule],
  controllers: [],
  providers: [
    ...providers,
    PgTaskRepository,
    {
      provide: ListTaskRepository,
      useClass: PgTaskRepository,
    },
    {
      provide: FindTaskRepository,
      useClass: PgTaskRepository,
    },
    {
      provide: CreateTaskRepository,
      useClass: PgTaskRepository,
    },
    {
      provide: DeleteTaskRepository,
      useClass: PgTaskRepository,
    },
    {
      provide: UpdateTaskRepository,
      useClass: PgTaskRepository,
    },
  ],
  exports: [
    ListTaskRepository,
    FindTaskRepository,
    CreateTaskRepository,
    DeleteTaskRepository,
    UpdateTaskRepository,
  ],
})
export class TaskRepositoryModule {}
