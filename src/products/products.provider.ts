import { Injectable } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsProvider {
  constructor(private readonly productsService: ProductsService) {}

  create(createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  findAll() {
    return this.productsService.findAll();
  }

  findOne(id) {
    return this.productsService.findOne(id);
  }
}
