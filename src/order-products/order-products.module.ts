import { Module } from '@nestjs/common';
import { OrderProductsService } from './order-products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProduct } from './entities/orderProducts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderProduct])],
  providers: [OrderProductsService],
})
export class OrderProductsModule {}
