import { Customer } from '@/domain/models/customer';

export abstract class FindByEmailCustomerRepository {
  abstract findByEmail(
    input: FindByEmailCustomerRepository.Input,
  ): Promise<FindByEmailCustomerRepository.Output>;
}

export namespace FindByEmailCustomerRepository {
  export type Input = {
    email: string;
  };

  export type Output = Customer;
}
