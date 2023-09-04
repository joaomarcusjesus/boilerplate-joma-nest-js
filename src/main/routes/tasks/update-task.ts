import { adaptNestRouter } from '@/main/adapters/nest-router-adapter';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { InternalServerErrorSchema } from '../../docs/components/internal-server-error';
import { NotFoundErrorSchema } from '../../docs/components/not-found-error';
import { BadRequestErrorSchema } from '../../docs/components/bad-request-error';
import { HttpNoContentSchema } from '../../docs/schemas/util/http-created-schema';
import { JwtInterceptor } from '../../../infra/jwt/interceptor';
import { UpdateTaskController } from '@/presentation/controllers/tasks/update-task';
import { HttpTaskBodySchema } from '../../docs/schemas/tasks/http-task-body-schema';
import { UserGuard } from '@/main/decorator/user.decorator';
import { UserLogged } from '@/infra/user-logged/user-logged.interface';

@ApiTags('Tasks')
@Controller('tasks')
@UseGuards(JwtInterceptor)
@ApiBearerAuth()
export class UpdateTaskRouter {
  constructor(private readonly controller: UpdateTaskController) {}

  @Put('/:id')
  @ApiOperation({
    summary: 'Atualizar uma tarefa por id',
  })
  @ApiBody({
    description: 'Corpo da requisição',
    type: HttpTaskBodySchema,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Schema de retorno da atualização de uma tarefa.',
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
  @ApiParam({
    name: 'id',
    required: true,
    type: 'number',
    description: 'Task id',
    example: 1,
  })
  async update(
    @Param('id') id: number,
    @Body() data,
    @Res() response: Response,
    @UserGuard() user: UserLogged,
  ) {
    return adaptNestRouter(this.controller)(
      {
        title: data.title,
        description: data.description,
        status: data.status,
        id,
        customer_id: user.user_id,
      },
      response,
    );
  }
}
