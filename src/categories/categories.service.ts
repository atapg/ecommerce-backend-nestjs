import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { Errors } from '../utils/errors';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const newCategory = await this.categoryRepository.create(
        createCategoryDto,
      );

      if (createCategoryDto.categoryId) {
        const parentCategory = await this.findOne(createCategoryDto.categoryId);

        if (!parentCategory) Errors.notFoundError('Category');

        newCategory.category = parentCategory;
      }

      return await this.categoryRepository.save(newCategory);
    } catch (e) {
      Errors.error(e);
    }
  }

  findAll() {
    return `This action returns all categories`;
  }

  async findOne(id: any): Promise<Category> | null {
    try {
      return await this.categoryRepository.findOneBy({ id });
    } catch (e) {
      Errors.notFoundError('Category');
    }
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
