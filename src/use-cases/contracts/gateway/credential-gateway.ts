import { Credential } from '@/domain/models/credential';

export abstract class CredentialGateway {
  abstract create(
    input: CredentialGateway.Input,
  ): Promise<CredentialGateway.Output>;
}

export namespace CredentialGateway {
  export type Input = {
    user_id: number;
    email: string;
  };

  export type Output = Credential;
}
