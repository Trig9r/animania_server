import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Max' })
  @IsNotEmpty()
  readonly nickname: string;

  @ApiProperty({ example: 'Максим' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'maxim@gmail.com' })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: 'maxim123' })
  @IsNotEmpty()
  readonly password: string;
}
