import { Injectable } from '@nestjs/common';
import { CreateCustomerRepository } from '../contracts/repository/customers/create-customer-repository';
import * as bcrypt from 'bcrypt';

export type CreateCustomerInput = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
};
export type CreateCustomerOutput = void;

@Injectable()
export class CreateCustomer {
  constructor(private readonly repository: CreateCustomerRepository) {}

  public async execute(
    input: CreateCustomerInput,
  ): Promise<CreateCustomerOutput> {
    const inputNew = {
      ...input,
      password: await bcrypt.hash(input.password, 10),
    };
    await this.repository.create(inputNew);
  }
}
