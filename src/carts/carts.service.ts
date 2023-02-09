import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { Errors } from '../utils/errors';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart) private readonly cartsRepository: Repository<Cart>,
    private readonly productsService: ProductsService,
  ) {}

  async create(createCartDto: CreateCartDto) {
    try {
      const product = await this.productsService.findOne(
        createCartDto.productId,
      );

      if (!product) Errors.notFoundError('Product');

      const newCart = await this.cartsRepository.create(createCartDto);
      newCart.product = product;

      return await this.cartsRepository.save(newCart);
    } catch (e) {
      Errors.error(e);
    }
  }

  findAll() {
    return `This action returns all carts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
