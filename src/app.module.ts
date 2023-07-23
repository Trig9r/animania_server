import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { SequilizeConfigService } from './config/sequelizeConfig.service';
import { databaseConfig } from './config/configuration';
import { AuthModule } from './auth/auth.module';
import { AnimeTitleModule } from './anime-title/anime-title.module';
import { TitleSeriesModule } from './title-series/title-series.module';
import { MerchModule } from './merch/merch.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { PaymentModule } from './payment/payment.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequilizeConfigService,
    }),
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    UsersModule,
    AuthModule,
    AnimeTitleModule,
    TitleSeriesModule,
    MerchModule,
    ShoppingCartModule,
    PaymentModule,
    CommentsModule,
  ],
})
export class AppModule {}
