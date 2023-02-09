import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { CartsProvider } from './carts.provider';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsProvider: CartsProvider) {}

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartsProvider.create(createCartDto);
  }

  // @Get()
  // findAll() {
  //   return this.cartsService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.cartsService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
  //   return this.cartsService.update(+id, updateCartDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.cartsService.remove(+id);
  // }
}
