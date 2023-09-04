import { adaptNestRouter } from '@/main/adapters/nest-router-adapter';
import {
  Controller,
  Get,
  Res,
  HttpStatus,
  UseGuards,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BadRequestErrorSchema } from '../../docs/components/bad-request-error';
import { NotFoundErrorSchema } from '../../docs/components/not-found-error';
import { InternalServerErrorSchema } from '../../docs/components/internal-server-error';
import { JwtInterceptor } from '../../../infra/jwt/interceptor';
import { ListTaskController } from '@/presentation/controllers/tasks/list-task';
import { HttpTaskListSchema } from '@/main/docs/schemas/tasks/http-task-list-schema';
import { UserGuard } from '@/main/decorator/user.decorator';
import { UserLogged } from '@/infra/user-logged/user-logged.interface';

@ApiTags('Tasks')
@Controller('tasks')
@UseGuards(JwtInterceptor)
@ApiBearerAuth()
export class ListTaskRouter {
  constructor(private readonly controller: ListTaskController) {}

  @Get('/')
  @ApiOperation({
    summary: 'Lista tarefas',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Schema de retorno da busca de uma tarefa.',
    type: HttpTaskListSchema,
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
  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
    description: 'Query params para a listagem de tarefas',
  })
  async list(
    @Query() query: { search?: string },
    @Res() response: Response,
    @UserGuard() user: UserLogged,
  ) {
    return adaptNestRouter(this.controller)(
      { search: query?.search, customer_id: user.user_id },
      response,
    );
  }
}
