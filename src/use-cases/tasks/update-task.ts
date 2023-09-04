import { ActionEnum } from '@/domain/models/audit';
import { Injectable } from '@nestjs/common';
import { CreateAuditRepository } from '../contracts/repository/audit/create-audit-repository';
import {
  FindTaskRepository,
  UpdateTaskRepository,
} from '../contracts/repository/tasks';

export type UpdateTaskInput = {
  id: number;
  title: string;
  description: string;
  status: string;
  customer_id: number;
};
export type UpdateTaskOutput = void;

@Injectable()
export class UpdateTask {
  constructor(
    private readonly updateTaskRepository: UpdateTaskRepository,
    private readonly findTaskRepository: FindTaskRepository,
    private readonly event: CreateAuditRepository,
  ) {}

  public async execute(input: UpdateTaskInput): Promise<UpdateTaskOutput> {
    await this.findTaskRepository.find({
      id: input.id,
      customer_id: input.customer_id,
    });

    const taskNew: UpdateTaskRepository.Input = {
      ...input,
    };

    await this.updateTaskRepository.update(taskNew);

    await this.event.create({
      customer_id: input.customer_id,
      action: ActionEnum.UPDATED,
    });
  }
}
