import { adaptNestRouter } from '@/main/adapters/nest-router-adapter';
import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
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
import { FindTaskController } from '@/presentation/controllers/tasks/find-task';
import { HttpTaskFindSchema } from '@/main/docs/schemas/tasks/http-task-find-schema';
import { UserGuard } from '@/main/decorator/user.decorator';
import { UserLogged } from '@/infra/user-logged/user-logged.interface';

@ApiTags('Tasks')
@Controller('tasks')
@UseGuards(JwtInterceptor)
@ApiBearerAuth()
export class FindTaskRouter {
  constructor(private readonly controller: FindTaskController) {}

  @Get('/:id')
  @ApiOperation({
    summary: 'Buscar task por id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Schema de retorno da busca de um task.',
    type: HttpTaskFindSchema,
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
    type: 'number',
    description: 'task id',
    example: 1,
  })
  async find(
    @Param('id') id: number,
    @Res() response: Response,
    @UserGuard() user: UserLogged,
  ) {
    return adaptNestRouter(this.controller)(
      {
        id,
        customer_id: user.user_id,
      },
      response,
    );
  }
}
