import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';

import { databaseConfig } from 'src/config/configuration';
import { SequilizeConfigService } from 'src/config/sequelizeConfig.service';
import { User } from 'src/users/users.model';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';

const mockedUser = {
  nickname: 'Trig9r',
  name: 'Кирилл',
  email: 'debil222@gmail.com',
  password: 'debil222',
};

describe('Auth Service', () => {
  let app: INestApplication;
  let authService: AuthService;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRootAsync({
          imports: [ConfigModule],
          useClass: SequilizeConfigService,
        }),
        ConfigModule.forRoot({
          load: [databaseConfig],
        }),
        AuthModule,
      ],
    }).compile();

    authService = testModule.get<AuthService>(AuthService);

    app = testModule.createNestApplication();

    await app.init();
  });

  beforeEach(async () => {
    const user = new User();

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    const hashedPassword = await bcrypt.hash(mockedUser.password, 10);

    user.nickname = mockedUser.nickname;
    user.name = mockedUser.name;
    user.email = mockedUser.email;
    user.password = hashedPassword;
    user.dateOfCreation = dd + '/' + mm + '/' + yyyy;

    return user.save();
  });

  afterEach(async () => {
    await User.destroy({ where: { nickname: mockedUser.nickname } });
    await User.destroy({ where: { nickname: 'Tes' } });
  });

  it('should valiate user', async () => {
    const user = await authService.validateUser(
      mockedUser.nickname,
      mockedUser.password,
    );

    expect(user.name).toBe(mockedUser.name);
    expect(user.nickname).toBe(mockedUser.nickname);
  });
});
