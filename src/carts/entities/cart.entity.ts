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
import { User } from '../../users/entities/user.entity';

@Entity()
export class Cart extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  id: string;

  // Every cart can only have one product but every product can have multiple carts
  @ManyToOne(() => Product, (product) => product.id)
  product: Product;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column({ type: 'bigint' })
  quantity: number;

  @Column({ type: 'uuid' })
  code: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
