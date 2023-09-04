export abstract class UpdateCustomerRepository {
  abstract update(
    input: UpdateCustomerRepository.Input,
  ): Promise<UpdateCustomerRepository.Output>;
}

export namespace UpdateCustomerRepository {
  export type Input = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };

  export type Output = void;
}
