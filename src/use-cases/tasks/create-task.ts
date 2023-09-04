import { ActionEnum } from '@/domain/models/audit';
import { Injectable } from '@nestjs/common';
import { CreateAuditRepository } from '../contracts/repository/audit/create-audit-repository';
import { CreateTaskRepository } from '../contracts/repository/tasks';

export type CreateTaskInput = {
  title: string;
  description: string;
  status: string;
  customer_id: number;
};
export type CreateTaskOutput = void;

@Injectable()
export class CreateTask {
  constructor(
    private readonly repository: CreateTaskRepository,
    private readonly event: CreateAuditRepository,
  ) {}

  public async execute(input: CreateTaskInput): Promise<CreateTaskOutput> {
    await this.repository.create(input);
    await this.event.create({
      customer_id: input.customer_id,
      action: ActionEnum.CREATED,
    });
  }
}
