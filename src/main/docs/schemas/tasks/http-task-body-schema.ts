import { ApiProperty } from '@nestjs/swagger';

export class HttpTaskBodySchema {
  @ApiProperty({
    type: 'string',
    description: 'Title task',
    example: 'Some title',
  })
  title: string;

  @ApiProperty({
    type: 'string',
    description: 'Description task',
    example: 'Some description',
  })
  description: string;

  @ApiProperty({
    type: 'string',
    description: 'Status task',
    example: 'PENDING',
  })
  status: string;
}
