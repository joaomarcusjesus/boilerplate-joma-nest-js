import { Controller } from '../contracts/controller';
import { HttpResponse } from '../../presentation/helpers/http';

export class LogControllerDecorator extends Controller {
  constructor(private readonly decoratee: Controller) {
    super();
  }

  async perform(httpRequest: any): Promise<HttpResponse> {
    try {
      const httpResponse = await this.decoratee.perform(httpRequest);
      return httpResponse;
    } catch (error) {
      throw error;
    }
  }
}
