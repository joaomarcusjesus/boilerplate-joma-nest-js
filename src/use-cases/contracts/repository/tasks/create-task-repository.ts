export abstract class CreateTaskRepository {
  abstract create(
    input: CreateTaskRepository.Input,
  ): Promise<CreateTaskRepository.Output>;
}

export namespace CreateTaskRepository {
  export type Input = {
    title: string;
    description: string;
    status: string;
    customer_id: number;
  };

  export type Output = void;
}
