import { ApiProperty } from '@nestjs/swagger';

class ShoppingCartItem {
  @ApiProperty({ example: 6 })
  id: number;

  @ApiProperty({ example: 5 })
  userId: number;

  @ApiProperty({ example: 'EVA02' })
  name: string;

  @ApiProperty({ example: 'Худи' })
  type: string;

  @ApiProperty({ example: 'S' })
  size: string;

  @ApiProperty({ example: 7600 })
  price: number;

  @ApiProperty({ example: 'black' })
  color: string;

  @ApiProperty({ example: 200 })
  quantity: number;

  @ApiProperty({
    example:
      'https://nikifilini.com/wp-content/uploads/2021/09/HOODIE-EVA02-1-scaled-1080x1438.jpg',
  })
  image: string;

  @ApiProperty({ example: 1 })
  count: number;

  @ApiProperty({ example: 7600 })
  total_price: number;

  @ApiProperty({ example: '2023-07-13T10:51:57.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2023-07-13T10:51:57.000Z' })
  updatedAt: string;
}

export class GetAllCartItemsResponse extends ShoppingCartItem {}
export class AddToCartNewItemResponse extends ShoppingCartItem {}

export class UpdateCountForItemCartResponse {
  @ApiProperty({ example: 2 })
  count: number;
}
export class UpdateCountForItemCartRequest {
  @ApiProperty({ example: 2 })
  count: number;
}

export class UpdateTotalPriceForItemCartResponse {
  @ApiProperty({ example: 13000 })
  total_price: number;
}
export class UpdateTotalPriceForItemCartRequest {
  @ApiProperty({ example: 13000 })
  total_price: number;
}
