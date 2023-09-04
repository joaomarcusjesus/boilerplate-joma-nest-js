import { CreateTaskRouter } from '@/main/routes/tasks/create-task';
import { DeleteTaskRouter } from '@/main/routes/tasks/delete-task';
import { FindTaskRouter } from '@/main/routes/tasks/find-task';
import { ListTaskRouter } from '@/main/routes/tasks/list-task';
import { UpdateTaskRouter } from '@/main/routes/tasks/update-task';
import { CreateTaskController } from '@/presentation/controllers/tasks/create-task';
import { DeleteTaskController } from '@/presentation/controllers/tasks/delete-task';
import { FindTaskController } from '@/presentation/controllers/tasks/find-task';
import { ListTaskController } from '@/presentation/controllers/tasks/list-task';
import { UpdateTaskController } from '@/presentation/controllers/tasks/update-task';
import {
  CreateTask,
  DeleteTask,
  FindTask,
  ListTask,
  UpdateTask,
} from '@/use-cases/tasks';
import { Module } from '@nestjs/common';
import { AuditEventModule } from '../events/audit.module';
import { TaskRepositoryModule } from './task-repository.module';

@Module({
  imports: [TaskRepositoryModule, AuditEventModule],
  controllers: [
    ListTaskRouter,
    FindTaskRouter,
    CreateTaskRouter,
    DeleteTaskRouter,
    UpdateTaskRouter,
  ],
  providers: [
    ListTaskController,
    ListTask,
    FindTaskController,
    FindTask,
    CreateTaskController,
    CreateTask,
    DeleteTaskController,
    DeleteTask,
    UpdateTaskController,
    UpdateTask,
  ],
})
export class TaskRoutesModule {}
