import {
  ListTask,
  ListTaskInput,
  ListTaskOutput,
} from '../../../use-cases/tasks';
import { Controller } from '../../contracts/controller';
import { HttpResponse, ok } from '../../helpers/http';
import { Injectable } from '@nestjs/common';

type HttpRequest = ListTaskInput;
type Model = ListTaskOutput;

@Injectable()
export class ListTaskController extends Controller {
  constructor(private readonly service: ListTask) {
    super();
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    const task = await this.service.execute(httpRequest);
    return ok(task);
  }
}
