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
import StatusEnum from '../enums/status.enum';
import { User } from '../../users/entities/user.entity';
import Helpers from '../../utils/helpers';
import { OrderProduct } from '../../order-products/entities/orderProducts.entity';

@Entity('orders')
export class Order extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @Column({ type: 'bigint' })
  totalPrice: number;

  @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.pending })
  status: StatusEnum;

  @Column({ type: 'simple-json' })
  details: string;

  @Column({
    type: 'text',
    default: Helpers.generateRandomCharacters(),
    nullable: false,
  })
  code: string;

  @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.pending })
  processStatus: StatusEnum;

  @Column({ type: 'longtext' })
  adminNote: string;

  @OneToMany(
    (orderProduct) => OrderProduct,
    (orderProduct) => orderProduct.order,
  )
  orderProduct: OrderProduct;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
