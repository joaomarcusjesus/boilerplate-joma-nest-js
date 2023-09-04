import { PgCustomerRepository } from '@/infra/repositories/mysql/typeorm/customers/customer-repository';
import { providers } from '@/infra/repositories/mysql/typeorm/helpers/repository-providers';
import {
  CreateCustomerRepository,
  DeleteCustomerRepository,
  FindCustomerRepository,
  ListCustomerRepository,
  UpdateCustomerRepository,
} from '@/use-cases/contracts/repository/customers';
import { FindByEmailCustomerRepository } from '@/use-cases/contracts/repository/customers/find-by-email-customer-repository';
import { Module } from '@nestjs/common';
import { TypeormDatabaseModule } from '../../../infra/repositories/mysql/typeorm/typeorm.module';

@Module({
  imports: [TypeormDatabaseModule],
  controllers: [],
  providers: [
    ...providers,
    PgCustomerRepository,
    {
      provide: ListCustomerRepository,
      useClass: PgCustomerRepository,
    },
    {
      provide: FindCustomerRepository,
      useClass: PgCustomerRepository,
    },
    {
      provide: CreateCustomerRepository,
      useClass: PgCustomerRepository,
    },
    {
      provide: DeleteCustomerRepository,
      useClass: PgCustomerRepository,
    },
    {
      provide: UpdateCustomerRepository,
      useClass: PgCustomerRepository,
    },
    {
      provide: FindByEmailCustomerRepository,
      useClass: PgCustomerRepository,
    },
  ],
  exports: [
    ListCustomerRepository,
    FindCustomerRepository,
    CreateCustomerRepository,
    DeleteCustomerRepository,
    UpdateCustomerRepository,
    FindByEmailCustomerRepository,
  ],
})
export class CustomerRepositoryModule {}
