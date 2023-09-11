import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CredentialGateway } from '../contracts/gateway/credential-gateway';
import * as bcrypt from 'bcrypt';
import { Credential } from '@/domain/models/credential';
import { FindByEmailCustomerRepository } from '../contracts/repository/customers/find-by-email-customer-repository';

export type SignInInput = {
  email: string;
  password: string;
};

export type SignInOutput = Credential;

@Injectable()
export class SignIn {
  constructor(
    private readonly gateway: CredentialGateway,
    private readonly repository: FindByEmailCustomerRepository,
  ) {}

  public async execute(input: SignInInput): Promise<SignInOutput> {
    const { email, password } = input;

    const customer = await this.repository.findByEmail({ email });

    if (!customer) {
      throw new NotFoundException();
    }

    const compare = await bcrypt.compare(password, customer.password);

    if (!compare) {
      throw new UnauthorizedException();
    }

    const payload = { user_id: customer.id, email: customer.email };

    return await this.gateway.create(payload);
  }
}
