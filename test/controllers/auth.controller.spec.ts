import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import * as request from 'supertest';
import * as session from 'express-session';
import * as passport from 'passport';

import { databaseConfig } from 'src/config/configuration';
import { SequilizeConfigService } from 'src/config/sequelizeConfig.service';
import { User } from 'src/users/users.model';
import { AuthModule } from 'src/auth/auth.module';

const mockedUser = {
  nickname: 'Trig9r',
  name: 'Кирилл',
  email: 'debil222@gmail.com',
  password: 'debil222',
};

describe('Auth Controller', () => {
  let app: INestApplication;

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

    app = testModule.createNestApplication();

    app.use(
      session({
        secret: 'keyword',
        resave: false,
        saveUninitialized: false,
      }),
    );
    app.use(passport.initialize());
    app.use(passport.session());

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

  it('should login user', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.nickname, password: mockedUser.password });

    expect(response.body.user.name).toBe(mockedUser.name);
    expect(response.body.user.nickname).toBe(mockedUser.nickname);
    expect(response.body.user.email).toBe(mockedUser.email);
    expect(response.body.msg).toBe('Logged in');
  });

  it('should login check', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.nickname, password: mockedUser.password });

    const loginCheck = await request(app.getHttpServer())
      .get('/users/login-check')
      .set('Cookie', login.headers['set-cookie']);

    expect(loginCheck.body.name).toBe(mockedUser.name);
    expect(loginCheck.body.nickname).toBe(mockedUser.nickname);
    expect(loginCheck.body.email).toBe(mockedUser.email);
  });

  it('should logout user', async () => {
    const response = await request(app.getHttpServer()).get('/users/logout');

    expect(response.body.msg).toBe('сессия закончена');
  });
});
