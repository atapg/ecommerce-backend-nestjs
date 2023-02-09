import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Category } from '../entities/category.entity';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  categoryId: string | number;
}
