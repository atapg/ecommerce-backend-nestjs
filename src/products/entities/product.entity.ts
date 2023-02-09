import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'longtext' })
  description: string;

  @Column({ type: 'simple-array' })
  tags: string[];

  @Column({ type: 'simple-array' })
  categories: string[];

  // @OneToMany((type) => Category, (category) => category.id)
  // categories: Category[];

  @Column({ type: 'bigint' })
  price: number;

  @Column({ type: 'bigint' })
  stock: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
