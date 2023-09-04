import { Credential } from '@/domain/models/credential';
import { CredentialGateway } from '@/use-cases/contracts/gateway/credential-gateway';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class Jwt implements CredentialGateway {
  constructor(private nestJwtService: JwtService) {}

  async create(
    input: CredentialGateway.Input,
  ): Promise<CredentialGateway.Output> {
    const access_token = this.nestJwtService.sign(input);

    return new Credential({ access_token });
  }
}
