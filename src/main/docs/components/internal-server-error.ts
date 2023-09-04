import { ApiProperty } from '@nestjs/swagger';

export class InternalServerErrorSchema {
  @ApiProperty({
    type: 'number',
    description: 'Status da requisição',
    example: 500,
  })
  statusCode: number;

  @ApiProperty({
    type: 'string',
    description: 'Mensagem de erro interno do servidor',
    example: 'Server failed. Try again soon',
  })
  message: string;

  @ApiProperty({
    type: 'string',
    description: 'Nome do erro',
    example: 'Internal Server Error',
  })
  error: string;
}
