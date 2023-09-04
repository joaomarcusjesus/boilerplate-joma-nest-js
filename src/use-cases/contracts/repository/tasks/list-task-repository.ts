import { Task } from '@/domain/models/task';

export abstract class ListTaskRepository {
  abstract list(
    input?: ListTaskRepository.Input,
  ): Promise<ListTaskRepository.Output>;
}

export namespace ListTaskRepository {
  export type Input = {
    search?: string;
    pageSize?: number;
    pageNumber?: number;
    customer_id: number;
  };

  export type Output = {
    items: Task[];
    pageInfo: {
      currentPage: number;
      itemsPerPage: number;
      totalItems: number;
      totalPages: number;
    };
  };
}
