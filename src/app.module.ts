import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import DatabaseConfig from './config/database.config';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { CartsModule } from './carts/carts.module';
import { OrdersModule } from './orders/orders.module';
import { OrderProductsModule } from './order-products/order-products.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(DatabaseConfig),
    UsersModule,
    CategoriesModule,
    ProductsModule,
    CartsModule,
    OrdersModule,
    OrderProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
