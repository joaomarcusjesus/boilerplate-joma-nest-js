import { Task } from '@/domain/models/task';
import { Injectable } from '@nestjs/common';
import { CreateAuditRepository } from '../contracts/repository/audit/create-audit-repository';
import { FindTaskRepository } from '../contracts/repository/tasks';
import { ActionEnum } from '../../domain/models/audit';

export type FindTaskInput = {
  id: number;
  customer_id: number;
};
export type FindTaskOutput = Task;

@Injectable()
export class FindTask {
  constructor(
    private readonly repository: FindTaskRepository,
    private readonly event: CreateAuditRepository,
  ) {}

  public async execute(input: FindTaskInput): Promise<FindTaskOutput> {
    const entity = await this.repository.find({
      id: input.id,
      customer_id: input.customer_id,
    });

    await this.event.create({
      customer_id: input.customer_id,
      action: ActionEnum.FIND,
    });

    return entity;
  }
}
