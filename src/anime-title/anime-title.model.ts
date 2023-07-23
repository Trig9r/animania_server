import { Table, Model, Column } from 'sequelize-typescript';

@Table
export class AnimeTitle extends Model {
  @Column
  name: string;

  @Column
  description: string;

  @Column
  genre: string;

  @Column
  rating: number;

  @Column
  studio: string;

  @Column
  status: string;

  @Column
  episodes: number;

  @Column
  dateRelease: string;

  @Column
  originalName: string;

  @Column({ defaultValue: false })
  new: boolean;

  @Column
  popularity: number;

  @Column
  images: string;
}
