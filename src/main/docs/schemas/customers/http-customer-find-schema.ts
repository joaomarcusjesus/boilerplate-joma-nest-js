import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class HttpCustomerFindSchema {
  @ApiProperty({
    type: 'number',
    description: 'Status da requisição',
    example: HttpStatus.OK,
  })
  statusCode: number;

  @ApiProperty({
    type: 'object',
    properties: {
      first_name: {
        type: 'string',
        description: 'Nome do cliente',
        example: 'John',
      },
      last_name: {
        type: 'string',
        description: 'Sobrenome do cliente',
        example: 'Doe',
      },
      email: {
        type: 'string',
        description: 'Email do cliente',
        example: 'john@gmail.com',
      },
      id: {
        type: 'string',
        description: 'Id do cliente',
        example: '102-0ei1-2kd-1232-e123',
      },
    },
  })
  // eslint-disable-next-line @typescript-eslint/ban-types
  data: Object;
}
