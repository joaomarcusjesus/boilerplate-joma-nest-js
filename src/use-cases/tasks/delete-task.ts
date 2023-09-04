import { Injectable } from '@nestjs/common';
import { CreateAuditRepository } from '../contracts/repository/audit/create-audit-repository';
import { DeleteTaskRepository } from '../contracts/repository/tasks';
import { ActionEnum } from '../../domain/models/audit';

export type DeleteTaskInput = {
  id: number;
  customer_id: number;
};
export type DeleteTaskOutput = void;

@Injectable()
export class DeleteTask {
  constructor(
    private readonly repository: DeleteTaskRepository,
    private readonly event: CreateAuditRepository,
  ) {}

  public async execute(input: DeleteTaskInput): Promise<DeleteTaskOutput> {
    await this.repository.delete({
      id: input.id,
      customer_id: input.customer_id,
    });
    await this.event.create({
      customer_id: input.customer_id,
      action: ActionEnum.DELETE,
    });
  }
}
