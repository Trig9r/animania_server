import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

import { AnimeTitle } from './anime-title.model';
import { TitleSeriesService } from 'src/title-series/title-series.service';
import { TitleSeries } from 'src/title-series/title-series.model';
import { AnimeTitleFilterProps, AnimeTitleQueryProps } from './types';

@Injectable()
export class AnimeTitleService {
  constructor(
    @InjectModel(AnimeTitle)
    private animeTitleModel: typeof AnimeTitle,
    private titleSeriesService: TitleSeriesService,
  ) {}

  async paginateAndFilter(
    query: AnimeTitleQueryProps,
  ): Promise<{ count: number; rows: AnimeTitle[] }> {
    const limit = +query.limit;
    const offset = +query.offset * 20;
    const filter = {} as Partial<AnimeTitleFilterProps>;

    if (query.dateReleasFrom && query.dateReleasTo) {
      filter.date = {
        [Op.between]: [query.dateReleasFrom, query.dateReleasTo],
      };
    }

    if (query.genre) {
      filter.genre = JSON.parse(decodeURIComponent(query.genre));
    }

    if (query.studio) {
      filter.studio = JSON.parse(decodeURIComponent(query.studio));
    }

    return this.animeTitleModel.findAndCountAll({
      limit,
      offset,
      where: filter,
    });
  }

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
