import { IsNotEmpty } from 'class-validator';

export class HttpCreateTaskValidationBody {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  status: string;
}
