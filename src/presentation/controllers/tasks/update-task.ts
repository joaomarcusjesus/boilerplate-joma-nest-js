import {
  UpdateTask,
  UpdateTaskInput,
  UpdateTaskOutput,
} from '../../../use-cases/tasks';
import { Controller } from '../../contracts/controller';
import { HttpResponse, noContent } from '../../helpers/http';
import { Injectable } from '@nestjs/common';

type HttpRequest = UpdateTaskInput;
type Model = UpdateTaskOutput;

@Injectable()
export class UpdateTaskController extends Controller {
  constructor(private readonly service: UpdateTask) {
    super();
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    await this.service.execute(httpRequest);
    return noContent();
  }
}
