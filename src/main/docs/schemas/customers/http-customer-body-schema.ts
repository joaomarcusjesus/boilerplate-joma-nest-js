import { ApiProperty } from '@nestjs/swagger';

export class HttpCustomerBodySchema {
  @ApiProperty({
    type: 'string',
    description: 'Primeiro nome do cliente',
    example: 'John',
  })
  first_name: string;

  @ApiProperty({
    type: 'string',
    description: 'Sobrenome do cliente',
    example: 'Doe',
  })
  last_name: string;

  @ApiProperty({
    type: 'string',
    description: 'Email do cliente',
    example: 'john@gmail.com',
  })
  email: string;

  @ApiProperty({
    type: 'string',
    description: 'Telefone do cliente',
    example: '5583993951425',
  })
  phone: string;

  @ApiProperty({
    type: 'string',
    description: 'Senha',
  })
  password: string;
}
