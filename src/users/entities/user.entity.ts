import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  BaseEntity,
  PrimaryColumn,
  Generated,
  OneToMany,
} from 'typeorm';
import UserRole from '../enums/role.enum';
import { Order } from '../../orders/entities/order.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.customer })
  role: string;

  // @OneToMany(() => Cart, (cart) => cart.user)
  // carts: Cart[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
