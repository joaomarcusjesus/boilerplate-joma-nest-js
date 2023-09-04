import { IsNotEmpty } from 'class-validator';

export class HttpSignInCustomerValidationBody {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
