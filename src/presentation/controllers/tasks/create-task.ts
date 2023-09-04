import { HttpResponse, noContent } from '../../helpers/http';
import {
  CreateTask,
  CreateTaskInput,
  CreateTaskOutput,
} from '../../../use-cases/tasks/create-task';
import { Controller } from '../../contracts/controller';
import { Injectable } from '@nestjs/common';

type HttpRequest = CreateTaskInput;
type Model = CreateTaskOutput;

@Injectable()
export class CreateTaskController extends Controller {
  constructor(private readonly service: CreateTask) {
    super();
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    await this.service.execute(httpRequest);
    return noContent();
  }
}
