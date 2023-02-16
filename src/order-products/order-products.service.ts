import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderProduct } from './entities/orderProducts.entity';
import { Repository } from 'typeorm';
import { CreateOrderProductDto } from './dto/create-order-product.dto';
import { Errors } from '../utils/errors';

@Injectable()
export class OrderProductsService {
  constructor(
    @InjectRepository(OrderProduct)
    private readonly orderProductsRepository: Repository<OrderProduct>,
  ) {}

  async create(createOrderProductDto: CreateOrderProductDto) {
    try {
      const newOrderProduct = await this.orderProductsRepository.create(
        createOrderProductDto,
      );

      newOrderProduct.product = createOrderProductDto.productId;
      newOrderProduct.order = createOrderProductDto.orderId;

      return await this.orderProductsRepository.save(newOrderProduct);
    } catch (e) {
      Errors.error(e);
    }
  }
}
