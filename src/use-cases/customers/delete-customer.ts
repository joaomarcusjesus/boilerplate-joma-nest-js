import { Injectable } from '@nestjs/common';
import { DeleteCustomerRepository } from '../contracts/repository/customers';

export type DeleteCustomerInput = {
  id: number;
};
export type DeleteCustomerOutput = void;

@Injectable()
export class DeleteCustomer {
  constructor(private readonly repository: DeleteCustomerRepository) {}

  public async execute(
    input: DeleteCustomerInput,
  ): Promise<DeleteCustomerOutput> {
    await this.repository.delete({ id: input.id });
  }
}
