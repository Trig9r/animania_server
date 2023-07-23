import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TitleSeries } from './title-series.model';

@Injectable()
export class TitleSeriesService {
  constructor(
    @InjectModel(TitleSeries)
    private titleSeriesModel: typeof TitleSeries,
  ) {}

  async getAllEpisodesByAnimeName(
    name: string,
  ): Promise<{ count: number; rows: TitleSeries[] }> {
    return this.titleSeriesModel.findAndCountAll({
      where: { anime: name },
    });
  }
}
