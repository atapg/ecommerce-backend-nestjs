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
import { DeleteCartDto } from './dto/delete-cart.dto';

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
  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.cartsProvider.findAll(code);
  }

  @Delete()
  remove(@Body() deleteCartDto: DeleteCartDto) {
    return this.cartsProvider.remove(deleteCartDto);
  }
}
