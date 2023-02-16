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
    //TODO validate categories array items and check whether they are true or not
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
    try {
      return this.categoryRepository.find();
    } catch (e) {
      Errors.error(e);
    }
  }

  async findOne(id: any): Promise<Category> | null {
    try {
      return await this.categoryRepository.findOne({
        where: { id },
        relations: ['category'],
      });
    } catch (e) {
      Errors.error(e);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const updateCategory = await this.categoryRepository.findOneBy({ id });

      if (!updateCategory) Errors.notFoundError('Category');

      if (updateCategoryDto.categoryId) {
        const parentCategory = await this.findOne(updateCategoryDto.categoryId);

        if (!parentCategory) Errors.notFoundError('Category');

        updateCategory.category = parentCategory;
      }

      return await this.categoryRepository.save({
        ...updateCategory,
        ...updateCategoryDto,
      });
    } catch (e) {
      Errors.error(e);
    }
  }

  async remove(id: string) {
    try {
      const deleteCategory = await this.categoryRepository.delete({ id });

      if (deleteCategory.affected) {
        return {
          message: 'Deleted Successfully',
        };
      }
    } catch (e) {
      Errors.error(e);
    }
  }
}
