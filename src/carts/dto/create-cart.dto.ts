import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  code: string;

  @IsNotEmpty()
  productId: string;
}
