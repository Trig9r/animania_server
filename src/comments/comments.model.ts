import { Table, Model, Column } from 'sequelize-typescript';

@Table
export class Comment extends Model {
  @Column
  userId: number;

  @Column
  nickname: string;

  @Column
  animeTitle: string;

  @Column
  text: string;
}
