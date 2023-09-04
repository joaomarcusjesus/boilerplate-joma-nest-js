import { adaptNestRouter } from '@/main/adapters/nest-router-adapter';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCustomerController } from '../../../presentation/controllers/customers/create-customer';
import { HttpCreateCustomerValidationBody } from '../../validations/customers/http-create-customer-validation-body';
import { HttpNoContentSchema } from '../../docs/schemas/util/http-created-schema';
import { BadRequestErrorSchema } from '../../docs/components/bad-request-error';
import { NotFoundErrorSchema } from '../../docs/components/not-found-error';
import { InternalServerErrorSchema } from '../../docs/components/internal-server-error';
import { HttpCustomerBodySchema } from '../../docs/schemas/customers/http-customer-body-schema';

@ApiTags('Customers')
@Controller('customers')
export class CreateCustomerRouter {
  constructor(private readonly controller: CreateCustomerController) {}

  @Post('/')
  @ApiOperation({
    summary: 'Criar um novo cliente',
  })
  @ApiBody({
    description: 'Corpo da requisição',
    type: HttpCustomerBodySchema,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Schema de retorno da criação de um novo cliente.',
    type: HttpNoContentSchema,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request.',
    type: BadRequestErrorSchema,
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found.',
    type: NotFoundErrorSchema,
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
    type: InternalServerErrorSchema,
  })
  async create(
    @Body() data: HttpCreateCustomerValidationBody,
    @Res() response: Response,
  ) {
    return adaptNestRouter(this.controller)(
      {
        first_name: data.first_name,
        email: data.email,
        phone: data.phone,
        last_name: data.last_name,
        password: data.password,
      },
      response,
    );
  }
}
