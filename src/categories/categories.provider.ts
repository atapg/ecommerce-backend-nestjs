import { Injectable } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesProvider {
  constructor(private readonly categoriesService: CategoriesService) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  getAll() {
    return this.categoriesService.findAll();
  }

  getOneById(id) {
    return this.categoriesService.findOne(id);
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  delete(id) {
    return this.categoriesService.remove(id);
  }
}
