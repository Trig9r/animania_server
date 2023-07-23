import { ApiProperty } from '@nestjs/swagger';

export class LoginUserRequest {
  @ApiProperty({ example: 'Max' })
  nickname: string;

  @ApiProperty({ example: 'maxim123' })
  password: string;
}

export class LoginUserResponce {
  @ApiProperty({
    example: {
      id: 6,
      nickname: 'Max',
      name: 'Максим',
      email: 'debil2@gmail.com',
    },
  })
  user: {
    id: number;
    nickname: string;
    name: string;
    email: string;
  };

  @ApiProperty({ example: 'Logged in' })
  msg: string;
}

export class LogoutUserResponse {
  @ApiProperty({ example: 'сессия закончена' })
  msg: string;
}

export class LoginCheckResponse {
  @ApiProperty({ example: 5 })
  id: string;

  @ApiProperty({ example: 'Trigger' })
  nickname: string;

  @ApiProperty({ example: 'Кирилл' })
  name: string;

  @ApiProperty({ example: 'debil@gmail.com' })
  email: string;
}

export class SignUpRequest {
  @ApiProperty({ example: 'Triggero' })
  nickname: string;

  @ApiProperty({ example: 'Кирилл' })
  name: string;

  @ApiProperty({ example: 'debil@gmail.com' })
  email: string;
}

export class SignUpResponse {
  @ApiProperty({ example: 6 })
  id: string;

  @ApiProperty({ example: 'Triggero' })
  nickname: string;

  @ApiProperty({ example: 'Кирилл' })
  name: string;

  @ApiProperty({ example: 'debil@gmail.com' })
  email: string;

  @ApiProperty({
    example: '$2b$10$up2rirH0Vn2Qnr3fUhUenO0QDKb5PcAHoHz90dvpWopbs5gTwC2Gm',
  })
  password: string;

  @ApiProperty({
    example: '10/07/2023',
  })
  dateOfCreation: string;

  @ApiProperty({
    example: '2023-07-10T15:30:33.091Z',
  })
  updatedAt: string;

  @ApiProperty({
    example: '2023-07-10T15:30:33.091Z',
  })
  createdAt: string;
}
