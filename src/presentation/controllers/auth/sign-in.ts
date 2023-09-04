import { HttpResponse } from '../../../presentation/helpers/http';
import { Controller } from '../../../presentation/contracts/controller';
import { Injectable } from '@nestjs/common';
import { SignIn, SignInInput, SignInOutput } from '../../../use-cases/auth/sign-in';
import { ok } from '../../helpers/http';

type HttpRequest = SignInInput;
type Model = SignInOutput;

@Injectable()
export class SignInController extends Controller {
  constructor(private readonly service: SignIn) {
    super();
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    const result = await this.service.execute(httpRequest);
    return ok(result);
  }
}
