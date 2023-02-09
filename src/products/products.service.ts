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

      return await this.productsRepository.save(newProduct);
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

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
