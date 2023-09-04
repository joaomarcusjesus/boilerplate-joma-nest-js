import { ApiProperty } from '@nestjs/swagger';

export class HttpSignInSchema {
  @ApiProperty({
    type: 'string',
    description: 'E-mail',
    example: 'john@gmail.com',
  })
  email: string;

  @ApiProperty({
    type: 'string',
    description: 'Password',
  })
  password: string;
}
