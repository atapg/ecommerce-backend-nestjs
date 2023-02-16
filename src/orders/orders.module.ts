import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersProvider } from './orders.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Cart } from '../carts/entities/cart.entity';
import { OrderProduct } from '../order-products/entities/orderProducts.entity';
import { CartsService } from '../carts/carts.service';
import { OrderProductsService } from '../order-products/order-products.service';
import { ProductsService } from '../products/products.service';
import { Product } from '../products/entities/product.entity';
import { CategoriesService } from '../categories/categories.service';
import { Category } from '../categories/entities/category.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      Cart,
      OrderProduct,
      Product,
      Category,
      User,
    ]),
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrdersProvider,
    CartsService,
    OrderProductsService,
    ProductsService,
    CategoriesService,
    UsersService,
  ],
})
export class OrdersModule {}
