import { Customer } from '@/domain/models/customer';

export abstract class FindCustomerRepository {
  abstract find(
    input: FindCustomerRepository.Input,
  ): Promise<FindCustomerRepository.Output>;
}

export namespace FindCustomerRepository {
  export type Input = {
    id: number;
  };

  export type Output = Customer | null;
}
