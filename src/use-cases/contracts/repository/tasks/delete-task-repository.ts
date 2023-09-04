export abstract class DeleteTaskRepository {
  abstract delete(
    input: DeleteTaskRepository.Input,
  ): Promise<DeleteTaskRepository.Output>;
}

export namespace DeleteTaskRepository {
  export type Input = {
    id: number;
    customer_id: number;
  };

  export type Output = void;
}
