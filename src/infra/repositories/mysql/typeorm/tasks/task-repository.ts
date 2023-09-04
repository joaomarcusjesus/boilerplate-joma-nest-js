import {
  CreateTaskRepository,
  DeleteTaskRepository,
  FindTaskRepository,
  ListTaskRepository,
  UpdateTaskRepository,
} from '@/use-cases/contracts/repository/tasks';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Brackets } from 'typeorm';
import { TaskEntity } from '../entities/task.entity';
import { TaskStatusEnum } from '../enums/task-status.enum';
import { TypeormTaskMapper } from '../mappers/task.mapper';

@Injectable()
export class PgTaskRepository
  implements
    FindTaskRepository,
    CreateTaskRepository,
    UpdateTaskRepository,
    DeleteTaskRepository,
    ListTaskRepository
{
  constructor(
    @Inject('TASK_REPOSITORY')
    private repository: Repository<TaskEntity>,
  ) {}

  async create(
    input: CreateTaskRepository.Input,
  ): Promise<CreateTaskRepository.Output> {
    const newInput = {
      ...input,
      status:
        input.status == 'concluded'
          ? TaskStatusEnum.CONCLUDED
          : input.status == 'pending'
          ? TaskStatusEnum.PENDING
          : TaskStatusEnum.IN_PROGRESS,
    };
    const entity = this.repository.create(newInput);
    await this.repository.save(entity);
  }

  async list(
    input: ListTaskRepository.Input,
  ): Promise<ListTaskRepository.Output> {
    const pgQuery = this.repository.createQueryBuilder('task');
    const { pageSize, pageNumber, search } = input;

    pgQuery.where('customer.id = :id', { id: Number(input.customer_id) });

    if (search) {
      pgQuery.andWhere(
        new Brackets((subQuery) => {
          subQuery.where('task.title LIKE :search', {
            search: `%${search}%`,
          });
        }),
      );
    }

    if (pageNumber && pageSize) {
      pgQuery.skip(pageSize * (pageNumber - 1)).take(pageSize);
    }

    const [tasks, totalItems] = await pgQuery.getManyAndCount();

    return {
      items: tasks.map(TypeormTaskMapper.ToDomainTask),
      pageInfo: {
        currentPage: pageNumber || 1,
        itemsPerPage: pageSize || totalItems,
        totalItems: totalItems,
        totalPages: pageSize ? Math.ceil(totalItems / pageSize) : 1,
      },
    };
  }

  async find(
    input: FindTaskRepository.Input,
  ): Promise<FindTaskRepository.Output> {
    const Task = await this.repository
      .createQueryBuilder('task')
      .where('task.id = :id', { id: Number(input.id) })
      .getOne();

    if (!Task) {
      return null;
    }

    return TypeormTaskMapper.ToDomainTask(Task);
  }

  async update(
    input: UpdateTaskRepository.Input,
  ): Promise<UpdateTaskRepository.Output> {
    const Task = await this.repository
      .createQueryBuilder()
      .where('id = :id', { id: input.id })
      .getOne();

    if (!Task) {
      return null;
    }

    await this.repository.save({
      ...Task,
      input,
    });
  }

  async delete(
    input: DeleteTaskRepository.Input,
  ): Promise<DeleteTaskRepository.Output> {
    const Task = await this.repository
      .createQueryBuilder()
      .where('id = :id', { id: input.id })
      .getOne();

    if (!Task) {
      return null;
    }

    await this.repository.remove(Task);
  }
}
