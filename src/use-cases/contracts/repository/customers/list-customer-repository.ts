import { Customer } from '@/domain/models/customer';

export abstract class ListCustomerRepository {
  abstract list(
    input?: ListCustomerRepository.Input,
  ): Promise<ListCustomerRepository.Output>;
}

export namespace ListCustomerRepository {
  export type Input = {
    search?: string;
    pageSize?: number;
    pageNumber?: number;
  };

  export type Output = {
    items: Customer[];
    pageInfo: {
      currentPage: number;
      itemsPerPage: number;
      totalItems: number;
      totalPages: number;
    };
  };
}
