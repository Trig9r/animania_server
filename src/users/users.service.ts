import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';

import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  findOne(filter: {
    where: {
      id?: string | number;
      nickname?: string;
      name?: string;
      email?: string;
    };
  }): Promise<User> {
    return this.userModel.findOne({ ...filter });
  }

  async create(
    createUserDto: CreateUserDto,
  ): Promise<User | { warningMessage: string }> {
    const user = new User();

    const existingByUserNickname = await this.findOne({
      where: {
        nickname: createUserDto.nickname,
      },
    });

    const existingByUserEmail = await this.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (existingByUserNickname) {
      return { warningMessage: 'Пользователь с таким ником уже существует!' };
    }

    if (existingByUserEmail) {
      return { warningMessage: 'Пользователь с таким email уже существует!' };
    }

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    user.nickname = createUserDto.nickname;
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = hashedPassword;
    user.dateOfCreation = dd + '/' + mm + '/' + yyyy;

    return user.save();
  }
}
