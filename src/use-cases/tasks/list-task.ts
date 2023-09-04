import { ActionEnum } from '@/domain/models/audit';
import { Task } from '@/domain/models/task';
import { Injectable } from '@nestjs/common';
import { CreateAuditRepository } from '../contracts/repository/audit/create-audit-repository';
import { ListTaskRepository } from '../contracts/repository/tasks';

export type ListTaskInput = {
  search?: string;
  customer_id: number;
};
export type ListTaskOutput = {
  items: Task[];
  pageInfo: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
};

@Injectable()
export class ListTask {
  constructor(
    private readonly repository: ListTaskRepository,
    private readonly event: CreateAuditRepository,
  ) {}

  public async execute(input: ListTaskInput): Promise<ListTaskOutput> {
    const entities = await this.repository.list({
      search: input.search,
      customer_id: input.customer_id,
    });

    await this.event.create({
      customer_id: input.customer_id,
      action: ActionEnum.LIST,
    });

    return entities;
  }
}
