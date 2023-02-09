import { Injectable } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesProvider {
  constructor(private readonly categoriesService: CategoriesService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoriesService.create(createCategoryDto);
  }
}
