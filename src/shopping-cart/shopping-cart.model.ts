import { Table, Model, Column } from 'sequelize-typescript';

@Table
export class ShoppingCart extends Model {
  @Column
  userId: number;

  @Column
  name: string;

  @Column
  type: string;

  @Column
  size: string;

  @Column({ defaultValue: 0 })
  price: number;

  @Column
  color: string;

  @Column({ defaultValue: 0 })
  quantity: number;

  @Column
  image: string;

  @Column({ defaultValue: 1 })
  count: number;

  @Column({ defaultValue: 0 })
  total_price: number;
}
