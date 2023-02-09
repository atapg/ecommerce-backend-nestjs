import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesProvider } from './categories.provider';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesProvider: CategoriesProvider) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesProvider.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesProvider.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesProvider.getOneById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesProvider.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesProvider.delete(id);
  }
}
