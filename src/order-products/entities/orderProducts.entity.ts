import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Order } from '../../orders/entities/order.entity';

@Entity('order_products')
export class OrderProduct extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  id: string;

  @ManyToOne((product) => Product, (product) => product.orderProducts)
  product: Product;

  @ManyToOne((order) => Order, (order) => order.orderProduct)
  order: Order;

  @Column({ type: 'simple-json' })
  details: string;

  @Column({ type: 'bigint' })
  quantity: number;

  @Column({ type: 'bigint' })
  singlePrice: number;

  @Column({ type: 'bigint' })
  totalPrice: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
