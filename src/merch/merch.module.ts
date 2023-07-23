import { Module } from '@nestjs/common';
import { MerchController } from './merch.controller';
import { MerchService } from './merch.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Merch } from './merch.model';

@Module({
  imports: [SequelizeModule.forFeature([Merch])],
  controllers: [MerchController],
  providers: [MerchService],
  exports: [MerchService],
})
export class MerchModule {}
