import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { CartsService } from '../carts/carts.service';
import { Errors } from '../utils/errors';
import StatusEnum from './enums/status.enum';
import { UsersService } from '../users/users.service';
import Helpers from '../utils/helpers';
import { CreateOrderProductDto } from '../order-products/dto/create-order-product.dto';
import { ProductsService } from '../products/products.service';
import { OrderProductsService } from '../order-products/order-products.service';

@Injectable()
export class OrdersProvider {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly cartsService: CartsService,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
    private readonly ordersProductsService: OrderProductsService,
  ) {}

  async create(createOrderDto: CreateOrderDto, userId) {
    let cartItems;

    try {
      // check code in carts
      cartItems = await this.cartsService.findAllWithRelation(
        createOrderDto.code,
      );
      // return cartItems;

      if (cartItems.length <= 0) {
        Errors.customError('No items found in cart with this code');
      }

      // calculate total price
      let totalPrice: number = 0;

      cartItems.forEach((item) => {
        totalPrice += Number(item.quantity) * Number(item.product.price);
      });

      if (totalPrice === 0) {
        Errors.somethingWentWrong();
      }

      createOrderDto.totalPrice = totalPrice;

      // set status
      createOrderDto.status = StatusEnum.pending;
      createOrderDto.processStatus = StatusEnum.pending;

      // TODO edit later (add shipping, names ...)
      createOrderDto.details = 'details';

      createOrderDto.userId = await this.usersService.findOne(userId);

      // create code for supporting order
      createOrderDto.code = Helpers.generateRandomCharacters();

      if (!createOrderDto.userId) {
        Errors.notFoundError('User');
      }

      // return createOrderDto;
    } catch (e) {
      Errors.error(e);
    }
    try {
      const order = await this.ordersService.create(createOrderDto);

      if (!order) {
        Errors.somethingWentWrong();
      }

      // delete items from cart
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await this.cartsService.removeById(item.id);
      }

      // add products with user id and quantity
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];

        let createOrderProductDto: CreateOrderProductDto = {
          quantity: Number(item.quantity),
          totalPrice: Number(item.product.price) * Number(item.quantity),
          singlePrice: Number(item.product.price),
          details: JSON.stringify({
            productAtTheMoment: item.product,
          }),
          orderId: order,
          productId: null,
        };

        createOrderProductDto.productId = await this.productsService.findOne(
          item.product.id,
        );

        const newOrderProduct = await this.ordersProductsService.create(
          createOrderProductDto,
        );

        if (!newOrderProduct) {
          Errors.somethingWentWrong();
        }
      }

      return order;
    } catch (e) {
      console.log(e);
      Errors.error(e);
    }
  }
}
