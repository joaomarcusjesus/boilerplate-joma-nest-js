import { Customer } from '@/domain/models/customer';
import { CustomerEntity } from '../entities/customer.entity';

export class TypeormCustomerMapper {
  static ToDomainCustomer(entity: CustomerEntity): Customer {
    return new Customer({
      id: entity.id,
      first_name: entity.first_name,
      last_name: entity.last_name,
      email: entity.email,
      phone: entity.phone,
      password: entity?.password,
    });
  }
}
