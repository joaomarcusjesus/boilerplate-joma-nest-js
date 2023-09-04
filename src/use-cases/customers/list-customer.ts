import { Injectable } from '@nestjs/common';
import { Customer } from '../../domain/models/customer';
import { ListCustomerRepository } from '../contracts/repository/customers';

export type ListCustomerInput = {
  search?: string;
};
export type ListCustomerOutput = {
  items: Customer[];
  pageInfo: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
};

@Injectable()
export class ListCustomer {
  constructor(private readonly repository: ListCustomerRepository) {}

  public async execute(input: ListCustomerInput): Promise<ListCustomerOutput> {
    return await this.repository.list({ search: input.search });
  }
}
