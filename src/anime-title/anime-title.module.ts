import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AnimeTitleController } from './anime-title.controller';
import { AnimeTitleService } from './anime-title.service';
import { AnimeTitle } from './anime-title.model';
import { TitleSeriesModule } from 'src/title-series/title-series.module';

@Module({
  imports: [SequelizeModule.forFeature([AnimeTitle]), TitleSeriesModule],
  controllers: [AnimeTitleController],
  providers: [AnimeTitleService],
})
export class AnimeTitleModule {}
