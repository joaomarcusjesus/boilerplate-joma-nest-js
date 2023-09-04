import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';
import { Controller } from '../../presentation/contracts/controller';
import { LogControllerDecorator } from '../../presentation/decorators/log-controller-decorator';

const makeLogControllerDecorator = (controller: Controller) => {
  return new LogControllerDecorator(controller);
};

type Adapter = (controller: Controller) => any;

export const adaptNestRouter: Adapter =
  (controller) => async (body: any, response: Response) => {
    const { statusCode, data = {} } = await makeLogControllerDecorator(
      controller,
    ).perform(body);
    const json = [HttpStatus.OK, HttpStatus.CREATED].includes(statusCode)
      ? {
          statusCode: statusCode,
          data: data,
        }
      : {
          statusCode: statusCode,
          message: data?.messageClient ?? data?.message,
          error: data?.name,
        };
    response?.status(statusCode)?.json(json);
  };
