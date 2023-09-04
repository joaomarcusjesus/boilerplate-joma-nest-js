import { adaptNestRouter } from '@/main/adapters/nest-router-adapter';
import { Controller, Get, HttpStatus, Param, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { FindCustomerController } from '@/presentation/controllers/customers/find-customer';
import { BadRequestErrorSchema } from '../../docs/components/bad-request-error';
import { NotFoundErrorSchema } from '../../docs/components/not-found-error';
import { InternalServerErrorSchema } from '../../docs/components/internal-server-error';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { HttpCustomerFindSchema } from '@/main/docs/schemas/customers/http-customer-find-schema';
import { JwtInterceptor } from '../../../infra/jwt/interceptor';

@ApiTags('Customers')
@Controller('customers')
@UseGuards(JwtInterceptor)
@ApiBearerAuth()
export class FindCustomerRouter {
  constructor(private readonly controller: FindCustomerController) {}

  @Get('/:id')
  @ApiOperation({
    summary: 'Buscar cliente por id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Schema de retorno da busca de um cliente.',
    type: HttpCustomerFindSchema,
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
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
    description: 'Cliente id',
    example: 'uuid',
  })
  async find(@Param('id') uuid: string, @Res() response: Response) {
    return adaptNestRouter(this.controller)(
      {
        uuid: uuid,
      },
      response,
    );
  }
}
