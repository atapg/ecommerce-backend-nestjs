import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsProvider } from './products.provider';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsProvider: ProductsProvider) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsProvider.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsProvider.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productsService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productsService.update(+id, updateProductDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productsService.remove(+id);
  // }
}
