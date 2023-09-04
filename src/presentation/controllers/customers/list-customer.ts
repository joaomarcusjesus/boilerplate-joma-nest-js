import {
  ListCustomer,
  ListCustomerInput,
  ListCustomerOutput,
} from '../../../use-cases/customers';
import { Controller } from '../../../presentation/contracts/controller';
import { HttpResponse, ok } from '../../../presentation/helpers/http';
import { Injectable } from '@nestjs/common';

type HttpRequest = ListCustomerInput;
type Model = ListCustomerOutput;

@Injectable()
export class ListCustomerController extends Controller {
  constructor(private readonly service: ListCustomer) {
    super();
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    const customer = await this.service.execute(httpRequest);
    return ok(customer);
  }
}
