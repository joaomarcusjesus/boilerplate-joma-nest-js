import { HttpResponse, noContent } from '../../helpers/http';
import {
  DeleteTask,
  DeleteTaskInput,
  DeleteTaskOutput,
} from '../../../use-cases/tasks/delete-task';
import { Controller } from '../../contracts/controller';
import { Injectable } from '@nestjs/common';

type HttpRequest = DeleteTaskInput;
type Model = DeleteTaskOutput;

@Injectable()
export class DeleteTaskController extends Controller {
  constructor(private readonly service: DeleteTask) {
    super();
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    await this.service.execute(httpRequest);
    return noContent();
  }
}
