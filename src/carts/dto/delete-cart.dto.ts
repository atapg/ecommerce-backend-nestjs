import { PartialType } from '@nestjs/mapped-types';
import { CreateCartDto } from './create-cart.dto';
import { IsNotEmpty } from 'class-validator';

export class DeleteCartDto extends PartialType(CreateCartDto) {
  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  productId: string;
}
