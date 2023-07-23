import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddToCartDto {
  @ApiProperty({ example: 'Trigger' })
  @IsNotEmpty()
  readonly nickname: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  userId?: number;

  @ApiProperty({ example: 'EVA02' })
  @IsNotEmpty()
  readonly merchName: string;
}
