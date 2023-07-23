import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Merch } from './merch.model';
import { MerchFilterProps, MerchQueryProps } from './types';
import { Op } from 'sequelize';

@Injectable()
export class MerchService {
  constructor(
    @InjectModel(Merch)
    private merchModel: typeof Merch,
  ) {}

  async paginateAndFilter(
    query: MerchQueryProps,
  ): Promise<{ count: number; rows: Merch[] }> {
    const limit = +query.limit;
    const offset = +query.offset * 20;
    const filter = {} as Partial<MerchFilterProps>;

    if (query.priceFrom && query.priceTo) {
      filter.price = {
        [Op.between]: [+query.priceFrom, +query.priceTo],
      };
    }

    if (query.anime) {
      filter.anime = JSON.parse(decodeURIComponent(query.anime));
    }

    if (query.color) {
      filter.color = JSON.parse(decodeURIComponent(query.color));
    }

    return this.merchModel.findAndCountAll({
      limit,
      offset,
      where: filter,
    });
  }

  async getOne(name: string): Promise<Merch> {
    return this.merchModel.findOne({ where: { name } });
  }
}
