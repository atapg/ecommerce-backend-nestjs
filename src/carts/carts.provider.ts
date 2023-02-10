import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { CartsService } from './carts.service';
import Helpers from '../utils/helpers';
import { DeleteCartDto } from './dto/delete-cart.dto';

@Injectable()
export class CartsProvider {
  constructor(private readonly cartsService: CartsService) {}

  create(createCartDto: CreateCartDto) {
    // this uuid or code is specific for each user and can be created every time there is no code
    // means that this code will be save in the cookies, so user doesn't need to login to add items into
    // their carts
    if (!createCartDto.code) createCartDto.code = Helpers.generateUUID();

    return this.cartsService.create(createCartDto);
  }

  findAll(code: string) {
    return this.cartsService.findAll(code);
  }

  remove(deleteCartDto: DeleteCartDto) {
    return this.cartsService.remove(deleteCartDto);
  }
}
