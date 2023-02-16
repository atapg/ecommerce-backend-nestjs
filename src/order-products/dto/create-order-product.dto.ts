import { IsNotEmpty, IsNumber } from 'class-validator';
import { Product } from '../../products/entities/product.entity';
import { Order } from '../../orders/entities/order.entity';

export class CreateOrderProductDto {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @IsNotEmpty()
  @IsNumber()
  singlePrice: number;

  productId: Product;

  orderId: Order;

  details: string;
}
