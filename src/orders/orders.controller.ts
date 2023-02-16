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
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersProvider } from './orders.provider';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersProvider: OrdersProvider) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Req() req) {
    return this.ordersProvider.create(createOrderDto, req.userId);
  }

  // @Get()
  // findAll() {
  //   return this.ordersService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.ordersService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
  //   return this.ordersService.update(+id, updateOrderDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ordersService.remove(+id);
  // }
}
