import { Task } from '@/domain/models/task';
import { TaskEntity } from '../entities/task.entity';

export class TypeormTaskMapper {
  static ToDomainTask(entity: TaskEntity): Task {
    return new Task({
      id: entity.id,
      customer_id: entity.customer_id,
      title: entity.title,
      description: entity.description,
      status: entity.status,
    });
  }
}
