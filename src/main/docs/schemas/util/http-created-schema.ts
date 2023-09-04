import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class HttpNoContentSchema {
  @ApiProperty({
    type: 'number',
    description: 'Status da requisição',
    example: HttpStatus.CREATED,
  })
  statusCode: number;

  @ApiProperty({
    type: 'null',
    description: 'Corpo da requisição',
    example: null,
  })
  // eslint-disable-next-line @typescript-eslint/ban-types
  data: Object;
}
