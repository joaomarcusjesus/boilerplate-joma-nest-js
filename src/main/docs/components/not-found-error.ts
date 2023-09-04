import { ApiProperty } from '@nestjs/swagger';

export class NotFoundErrorSchema {
  @ApiProperty({
    type: 'number',
    description: 'Status da requisição',
    example: 404,
  })
  statusCode: number;

  @ApiProperty({
    type: 'object',
    properties: {
      message: {
        type: 'string',
        description: 'Mensagem de error de não encontrado',
        example: 'Not found',
      },
    },
  })
  data: string;

  @ApiProperty({
    type: 'string',
    description: 'Nome do erro',
    example: 'Not Found',
  })
  error: string;
}
