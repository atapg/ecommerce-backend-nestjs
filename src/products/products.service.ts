import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Errors } from '../utils/errors';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const newProduct = await this.productsRepository.create(createProductDto);

      // const categories = [];
      // if (createProductDto.categories.length > 0) {
      //   createProductDto.categories.forEach(async (categoryId) => {
      //     const c = await this.categoriesService.findOne(categoryId);
      //     categories.push(c);
      //   });
      // }
      //
      // newProduct.categories = categories;

      return await this.productsRepository.save({
        tags: JSON.stringify(newProduct.tags),
        categories: JSON.stringify(newProduct.categories),
        ...newProduct,
      });
    } catch (e) {
      Errors.error(e);
    }
  }

  findAll() {
    //TODO add pagination
    try {
      return this.productsRepository.find();
    } catch (e) {
      Errors.error(e);
    }
  }

  async findOne(id) {
    try {
      const product = await this.productsRepository.findOneBy({ id });

      const categories = [];
      // Product has categories
      if (product.categories.length > 0) {
        for (let i = 0; i < product.categories.length; i++) {
          const cat = await this.categoriesService.findOne(
            product.categories[i],
          );
          categories.push(cat);
        }
      }

      product.categories = categories;

      return product;
    } catch (e) {
      Errors.error(e);
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
