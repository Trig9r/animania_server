import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

import { AnimeTitle } from './anime-title.model';
import { TitleSeriesService } from 'src/title-series/title-series.service';
import { TitleSeries } from 'src/title-series/title-series.model';

@Injectable()
export class AnimeTitleService {
  constructor(
    @InjectModel(AnimeTitle)
    private animeTitleModel: typeof AnimeTitle,
    private titleSeriesService: TitleSeriesService,
  ) {}

  async getAll(): Promise<{ count: number; rows: AnimeTitle[] }> {
    return this.animeTitleModel.findAndCountAll();
  }

  async new(): Promise<{ count: number; rows: AnimeTitle[] }> {
    return this.animeTitleModel.findAndCountAll({
      where: { new: true },
    });
  }

  async findOneByName(name: string): Promise<AnimeTitle> {
    return this.animeTitleModel.findOne({
      where: { name },
    });
  }

  async findOne(name: string): Promise<{
    anime: AnimeTitle;
    episodes: { count: number; rows: TitleSeries[] };
  }> {
    return {
      anime: await this.animeTitleModel.findOne({
        where: { name },
      }),
      episodes: await this.titleSeriesService.getAllEpisodesByAnimeName(name),
    };
  }

  async searchByString(
    str: string,
  ): Promise<{ count: number; rows: AnimeTitle[] }> {
    return this.animeTitleModel.findAndCountAll({
      limit: 5,
      where: { name: { [Op.like]: `%${str}%` } },
    });
  }
}
