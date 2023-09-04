import { Task } from '@/domain/models/task';

export abstract class FindTaskRepository {
  abstract find(
    input: FindTaskRepository.Input,
  ): Promise<FindTaskRepository.Output>;
}

export namespace FindTaskRepository {
  export type Input = {
    id: number;
    customer_id: number;
  };

  export type Output = Task | null;
}
