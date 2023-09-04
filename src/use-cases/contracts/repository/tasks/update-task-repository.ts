export abstract class UpdateTaskRepository {
  abstract update(
    input: UpdateTaskRepository.Input,
  ): Promise<UpdateTaskRepository.Output>;
}

export namespace UpdateTaskRepository {
  export type Input = {
    id: number;
    title: string;
    description: string;
    status: string;
    customer_id: number;
  };

  export type Output = void;
}
