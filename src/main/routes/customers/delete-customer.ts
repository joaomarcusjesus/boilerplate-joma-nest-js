import { adaptNestRouter } from '@/main/adapters/nest-router-adapter';
import { Controller, Delete, Param, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteCustomerController } from '@/presentation/controllers/customers/delete-customer';
import { NotFoundErrorSchema } from '../../docs/components/not-found-error';
import { InternalServerErrorSchema } from '../../docs/components/internal-server-error';
import { BadRequestErrorSchema } from '../../docs/components/bad-request-error';
import { JwtInterceptor } from '../../../infra/jwt/interceptor';

@ApiTags('Customers')
@Controller('customers')
@UseGuards(JwtInterceptor)
@ApiBearerAuth()
export class DeleteCustomerRouter {
  constructor(private readonly controller: DeleteCustomerController) {}

  @Delete('/:id')
  @ApiOperation({
    summary: 'Deletar cliente por id',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
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
  async delete(@Param('id') uuid: string, @Res() response: Response) {
    return adaptNestRouter(this.controller)(
      {
        uuid: uuid,
      },
      response,
    );
  }
}
