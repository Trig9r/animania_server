import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { TitleSeries } from './title-series.model';
import { TitleSeriesService } from './title-series.service';

@Module({
  imports: [SequelizeModule.forFeature([TitleSeries])],
  providers: [TitleSeriesService],
  exports: [TitleSeriesService],
})
export class TitleSeriesModule {}
