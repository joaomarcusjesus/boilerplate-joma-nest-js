import { Injectable } from '@nestjs/common';
import { Customer } from '../../domain/models/customer';
import { FindCustomerRepository } from '../contracts/repository/customers';

export type FindCustomerInput = {
  id: number;
};
export type FindCustomerOutput = Customer;

@Injectable()
export class FindCustomer {
  constructor(private readonly repository: FindCustomerRepository) {}

  public async execute(input: FindCustomerInput): Promise<FindCustomerOutput> {
    return await this.repository.find({ id: input.id });
  }
}
