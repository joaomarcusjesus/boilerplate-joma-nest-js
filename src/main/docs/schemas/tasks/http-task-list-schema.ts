import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class HttpTaskListSchema {
  @ApiProperty({
    type: 'number',
    description: 'Status da requisição',
    example: HttpStatus.OK,
  })
  statusCode: number;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'Title task',
          example: 'some title',
        },
        description: {
          type: 'string',
          description: 'Description task',
          example: 'some description',
        },
        status: {
          type: 'string',
          description: 'Status task',
          example: 'pending',
        },
        id: {
          type: 'number',
          description: 'Id task',
          example: 1,
        },
      },
    },
  })
  // eslint-disable-next-line @typescript-eslint/ban-types
  data: Object;
}
