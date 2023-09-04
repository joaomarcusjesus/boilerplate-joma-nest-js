import { ApiProperty } from '@nestjs/swagger';

export class BadRequestErrorSchema {
  @ApiProperty({
    type: 'number',
    description: 'Status da requisição',
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      description: 'Mensagem de erro de validação',
      example: 'Param is required',
    },
  })
  message: string;

  @ApiProperty({
    type: 'string',
    description: 'Nome do erro',
    example: 'Bad Request',
  })
  error: string;
}
