import { FindCustomerRouter } from '@/main/routes/customers/find-customer';
import { ListCustomerRouter } from '@/main/routes/customers/list-customer';
import { FindCustomerController } from '@/presentation/controllers/customers/find-customer';
import { ListCustomerController } from '@/presentation/controllers/customers/list-customer';
import {
  CreateCustomer,
  DeleteCustomer,
  FindCustomer,
  ListCustomer,
  UpdateCustomer,
} from '@/use-cases/customers';
import { Module } from '@nestjs/common';
import { CustomerRepositoryModule } from './customer-repository.module';
import { CreateCustomerRouter } from '../../routes/customers/create-customer';
import { CreateCustomerController } from '@/presentation/controllers/customers/create-customer';
import { DeleteCustomerController } from '@/presentation/controllers/customers/delete-customer';
import { DeleteCustomerRouter } from '@/main/routes/customers/delete-customer';
import { UpdateCustomerRouter } from '@/main/routes/customers/update-customer';
import { UpdateCustomerController } from '@/presentation/controllers/customers/update-customer';

@Module({
  imports: [CustomerRepositoryModule],
  controllers: [
    ListCustomerRouter,
    FindCustomerRouter,
    CreateCustomerRouter,
    DeleteCustomerRouter,
    UpdateCustomerRouter,
  ],
  providers: [
    ListCustomerController,
    ListCustomer,
    FindCustomerController,
    FindCustomer,
    CreateCustomerController,
    CreateCustomer,
    DeleteCustomerController,
    DeleteCustomer,
    UpdateCustomerController,
    UpdateCustomer,
  ],
})
export class CustomerRoutesModule {}
