import { Table, Model, Column } from 'sequelize-typescript';

@Table
export class Merch extends Model {
  @Column
  name: string;

  @Column
  type: string;

  @Column
  description: string;

  @Column
  sizes: string;

  @Column
  price: number;

  @Column
  color: string;

  @Column
  materials: string;

  @Column
  anime: string;

  @Column
  quantity: number;

  @Column
  images: string;
}
