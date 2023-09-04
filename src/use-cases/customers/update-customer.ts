import { Injectable } from '@nestjs/common';
import { FindCustomerRepository } from '../contracts/repository/customers';
import { UpdateCustomerRepository } from '../contracts/repository/customers/update-customer-repository';

export type UpdateCustomerInput = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
};
export type UpdateCustomerOutput = void;

@Injectable()
export class UpdateCustomer {
  constructor(
    private readonly updateCustomerRepository: UpdateCustomerRepository,
    private readonly findCustomerRepository: FindCustomerRepository,
  ) {}

  public async execute(
    input: UpdateCustomerInput,
  ): Promise<UpdateCustomerOutput> {
    await this.findCustomerRepository.find({ id: input.id });

    const customerNew: UpdateCustomerRepository.Input = {
      ...input,
    };

    await this.updateCustomerRepository.update(customerNew);
  }
}
