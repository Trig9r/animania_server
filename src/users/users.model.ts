import { Table, Model, Column } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  nickname: string;

  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  dateOfCreation: string;
}
