import { Table, Model, Column } from 'sequelize-typescript';

@Table
export class TitleSeries extends Model {
  @Column
  name: string;

  @Column
  episode: number;

  @Column
  url: string;

  @Column
  voiceover: string;

  @Column
  anime: string;

  @Column
  dateRelease: string;
}
