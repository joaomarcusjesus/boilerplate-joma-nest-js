export abstract class CreateAuditRepository {
  abstract create(
    input: CreateAuditRepository.Input,
  ): Promise<CreateAuditRepository.Output>;
}

export namespace CreateAuditRepository {
  export type Input = {
    action: string;
    customer_id: number;
  };

  export type Output = void;
}
