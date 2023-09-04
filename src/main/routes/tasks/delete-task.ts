import { adaptNestRouter } from '@/main/adapters/nest-router-adapter';
import {
  Controller,
  Delete,
  Param,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
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
import { NotFoundErrorSchema } from '../../docs/components/not-found-error';
import { InternalServerErrorSchema } from '../../docs/components/internal-server-error';
import { BadRequestErrorSchema } from '../../docs/components/bad-request-error';
import { JwtInterceptor } from '../../../infra/jwt/interceptor';
import { DeleteTaskController } from '@/presentation/controllers/tasks/delete-task';
import { UserGuard } from '@/main/decorator/user.decorator';
import { UserLogged } from '@/infra/user-logged/user-logged.interface';

@ApiTags('Tasks')
@Controller('tasks')
@UseGuards(JwtInterceptor)
@ApiBearerAuth()
export class DeleteTaskRouter {
  constructor(private readonly controller: DeleteTaskController) {}

  @Delete('/:id')
  @ApiOperation({
    summary: 'Deletar task por id',
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
    type: 'number',
    description: 'Task id',
    example: 1,
  })
  async delete(
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
