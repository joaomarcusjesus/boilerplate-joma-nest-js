import {
  CreateCustomerRepository,
  DeleteCustomerRepository,
  FindCustomerRepository,
  ListCustomerRepository,
  UpdateCustomerRepository,
} from '@/use-cases/contracts/repository/customers';
import { FindByEmailCustomerRepository } from '@/use-cases/contracts/repository/customers/find-by-email-customer-repository';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CustomerEntity } from '../entities/customer.entity';
import { TypeormCustomerMapper } from '../mappers/customer.mapper';
import { Brackets } from 'typeorm';

@Injectable()
export class PgCustomerRepository
  implements
    FindCustomerRepository,
    FindByEmailCustomerRepository,
    CreateCustomerRepository,
    UpdateCustomerRepository,
    DeleteCustomerRepository,
    ListCustomerRepository
{
  constructor(
    @Inject('CUSTOMER_REPOSITORY')
    private repository: Repository<CustomerEntity>,
  ) {}

  async create(
    input: CreateCustomerRepository.Input,
  ): Promise<CreateCustomerRepository.Output> {
    const entity = this.repository.create(input);
    await this.repository.save(entity);
  }

  async list(
    input: ListCustomerRepository.Input,
  ): Promise<ListCustomerRepository.Output> {
    const pgQuery = this.repository.createQueryBuilder('customer');
    const { pageSize, pageNumber, search } = input;

    if (search) {
      pgQuery.andWhere(
        new Brackets((subQuery) => {
          subQuery.where('customer.first_name LIKE :search', {
            search: `%${search}%`,
          });
          subQuery.orWhere('customer.last_name LIKE :search', {
            search: `%${search}%`,
          });
        }),
      );
    }

    if (pageNumber && pageSize) {
      pgQuery.skip(pageSize * (pageNumber - 1)).take(pageSize);
    }

    const [customers, totalItems] = await pgQuery.getManyAndCount();

    return {
      items: customers.map(TypeormCustomerMapper.ToDomainCustomer),
      pageInfo: {
        currentPage: pageNumber || 1,
        itemsPerPage: pageSize || totalItems,
        totalItems: totalItems,
        totalPages: pageSize ? Math.ceil(totalItems / pageSize) : 1,
      },
    };
  }

  async find(
    input: FindCustomerRepository.Input,
  ): Promise<FindCustomerRepository.Output> {
    const customer = await this.repository
      .createQueryBuilder('customer')
      .where('customer.id = :id', { id: Number(input.id) })
      .getOne();

    if (!customer) {
      return null;
    }

    return TypeormCustomerMapper.ToDomainCustomer(customer);
  }

  async findByEmail(
    input: FindByEmailCustomerRepository.Input,
  ): Promise<FindByEmailCustomerRepository.Output> {
    const customer = await this.repository
      .createQueryBuilder('customer')
      .where('customer.email = :email', { email: input.email })
      .getOne();

    if (!customer) {
      return null;
    }

    return TypeormCustomerMapper.ToDomainCustomer(customer);
  }

  async update(
    input: UpdateCustomerRepository.Input,
  ): Promise<UpdateCustomerRepository.Output> {
    const customer = await this.repository
      .createQueryBuilder()
      .where('id = :id', { id: input.id })
      .getOne();

    if (!customer) {
      return null;
    }

    await this.repository.save({
      ...customer,
      input,
    });
  }

  async delete(
    input: DeleteCustomerRepository.Input,
  ): Promise<DeleteCustomerRepository.Output> {
    const customer = await this.repository
      .createQueryBuilder()
      .where('id = :id', { id: input.id })
      .getOne();

    if (!customer) {
      return null;
    }

    await this.repository.remove(customer);
  }
}
