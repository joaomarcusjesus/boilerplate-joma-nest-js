import { SignInRouter } from '@/main/routes/auth/sign-in';
import { SignInController } from '@/presentation/controllers/auth/sign-in';
import { SignIn } from '@/use-cases/auth/sign-in';
import { Module } from '@nestjs/common';
import { CustomerRepositoryModule } from '../customers/customer-repository.module';
import { CredentialGateway } from '@/use-cases/contracts/gateway/credential-gateway';
import { Jwt } from '@/infra/jwt/jwt.service';

@Module({
  imports: [CustomerRepositoryModule],
  controllers: [SignInRouter],
  providers: [
    SignInController,
    SignIn,
    Jwt,
    {
      provide: CredentialGateway,
      useClass: Jwt,
    },
  ],
})
export class AuthRoutesModule {}
