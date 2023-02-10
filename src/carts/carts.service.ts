import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { DeleteCartDto } from './dto/delete-cart.dto';
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
    let product;

    try {
      product = await this.productsService.findOne(createCartDto.productId);
    } catch (e) {
      if (!product) Errors.notFoundError('Product');
    }

    try {
      // check if the same product with the same code already exists
      const cartWithSameProductAlreadyExists =
        await this.cartsRepository.findOne({
          where: {
            code: createCartDto.code,
            product: {
              id: +createCartDto.productId,
            },
          },
        });

      // if it exists just put the quantity
      if (cartWithSameProductAlreadyExists) {
        return await this.cartsRepository.save({
          ...cartWithSameProductAlreadyExists,
          quantity: createCartDto.quantity,
        });
      }

      // create cart
      const newCart = await this.cartsRepository.create(createCartDto);
      newCart.product = product;

      return await this.cartsRepository.save(newCart);
    } catch (e) {
      Errors.error(e);
    }
  }

  findAll(code: string) {
    try {
      return this.cartsRepository.findBy({
        code,
      });
    } catch (e) {
      Errors.error(e);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  async remove(deleteCartDto: DeleteCartDto) {
    try {
      const deleteProduct = await this.cartsRepository.delete({
        code: deleteCartDto.code,
        product: {
          id: +deleteCartDto.productId,
        },
      });

      if (deleteProduct.affected) {
        return {
          message: 'Deleted Successfully',
        };
      } else {
        Errors.somethingWentWrong();
      }
    } catch (e) {
      Errors.error(e);
    }
  }
}
