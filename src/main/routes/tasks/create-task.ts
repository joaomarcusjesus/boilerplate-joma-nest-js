import { adaptNestRouter } from '@/main/adapters/nest-router-adapter';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
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
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HttpNoContentSchema } from '../../docs/schemas/util/http-created-schema';
import { BadRequestErrorSchema } from '../../docs/components/bad-request-error';
import { NotFoundErrorSchema } from '../../docs/components/not-found-error';
import { InternalServerErrorSchema } from '../../docs/components/internal-server-error';
import { HttpCreateTaskValidationBody } from '@/main/validations/tasks/http-create-task-validation-body';
import { HttpTaskBodySchema } from '../../docs/schemas/tasks/http-task-body-schema';
import { CreateTaskController } from '@/presentation/controllers/tasks/create-task';
import { JwtInterceptor } from '@/infra/jwt/interceptor';
import { UserGuard } from '@/main/decorator/user.decorator';
import { UserLogged } from '@/infra/user-logged/user-logged.interface';

@ApiTags('Tasks')
@Controller('tasks')
export class CreateTaskRouter {
  constructor(private readonly controller: CreateTaskController) {}

  @Post('/')
  @ApiBearerAuth()
  @UseGuards(JwtInterceptor)
  @ApiOperation({
    summary: 'Criar uma nova task',
  })
  @ApiBody({
    description: 'Corpo da requisição',
    type: HttpTaskBodySchema,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Schema de retorno da criação de uma nova task.',
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
    @Body() data: HttpCreateTaskValidationBody,
    @Res() response: Response,
    @UserGuard() user: UserLogged,
  ) {
    return adaptNestRouter(this.controller)(
      {
        title: data.title,
        description: data.description,
        status: data.status,
        customer_id: user.user_id,
      },
      response,
    );
  }
}
