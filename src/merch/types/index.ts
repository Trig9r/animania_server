import { ApiProperty } from '@nestjs/swagger';
import { Op } from 'sequelize';

class Merch {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'EVA02' })
  name: string;

  @ApiProperty({ example: 'Худи' })
  type: string;

  @ApiProperty({
    example: 'Лимитированный чёрный худи, посвящённый аниме Евангелион...',
  })
  description: string;

  @ApiProperty({ example: '["S", "M", "L", "XL"]' })
  sizes: string;

  @ApiProperty({ example: 7600 })
  price: number;

  @ApiProperty({ example: 'black' })
  color: string;

  @ApiProperty({ example: '["хлопок"]' })
  materials: string;

  @ApiProperty({ example: 'Евангелион' })
  anime: string;

  @ApiProperty({ example: 200 })
  quantity: number;

  @ApiProperty({
    example:
      '["https://nikifilini.com/wp-content/uploads/2021/09/HOODIE-EVA02-1-scaled-1080x1438.jpg", "https://nikifilini.com/wp-content/uploads/2021/09/HOODIE-EVA02-2-scaled-1080x1438.jpg"]',
  })
  images: string;

  @ApiProperty({ example: '2023-07-11T11:29:28.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2023-07-11T11:29:28.000Z' })
  updatedAt: string;
}

export class GetAllMerchResponse {
  @ApiProperty({ example: 1 })
  count: number;

  @ApiProperty({ type: Merch, isArray: true })
  rows: Merch;
}

export class GetOneMerchByNameResponse extends Merch {}

export interface MerchQueryProps {
  limit: string;
  offset: string;
  anime: string | undefined;
  color: string | undefined;
  priceFrom: string | undefined;
  priceTo: string | undefined;
}

export interface MerchFilterProps {
  anime: string | undefined;
  color: string | undefined;
  price: { [Op.between]: number[] };
}
