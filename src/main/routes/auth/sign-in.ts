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
import { HttpNoContentSchema } from '../../docs/schemas/util/http-created-schema';
import { BadRequestErrorSchema } from '../../docs/components/bad-request-error';
import { NotFoundErrorSchema } from '../../docs/components/not-found-error';
import { InternalServerErrorSchema } from '../../docs/components/internal-server-error';
import { HttpSignInCustomerValidationBody } from '@/main/validations/auth/http-sign-in-customer-validation-body';
import { HttpSignInSchema } from '@/main/docs/schemas/auth/http-sign-in-schema';
import { SignInController } from '@/presentation/controllers/auth/sign-in';

@ApiTags('Auth')
@Controller('auth')
export class SignInRouter {
  constructor(private readonly controller: SignInController) {}

  @Post('/sign-in')
  @ApiOperation({
    summary: 'Logar cliente',
  })
  @ApiBody({
    description: 'Corpo da requisição',
    type: HttpSignInSchema,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Schema de retorno da criação de um novo token.',
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
    @Body() data: HttpSignInCustomerValidationBody,
    @Res() response: Response,
  ) {
    return adaptNestRouter(this.controller)(
      {
        password: data.password,
        email: data.email,
      },
      response,
    );
  }
}
