import { FindTaskInput, FindTaskOutput } from '../../../use-cases/tasks';
import { Controller } from '../../contracts/controller';
import { HttpResponse, ok } from '../../helpers/http';
import { Injectable } from '@nestjs/common';
import { FindTask } from '../../../use-cases/tasks/find-task';

type HttpRequest = FindTaskInput;
type Model = FindTaskOutput;

@Injectable()
export class FindTaskController extends Controller {
  constructor(private readonly service: FindTask) {
    super();
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    const entity = await this.service.execute(httpRequest);
    return ok(entity);
  }
}
