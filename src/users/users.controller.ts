import {
  Controller,
  Post,
  Get,
  HttpCode,
  HttpStatus,
  Header,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiOkResponse } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import {
  LoginCheckResponse,
  LoginUserRequest,
  LoginUserResponce,
  LogoutUserResponse,
  SignUpRequest,
  SignUpResponse,
} from './types';

@Controller('users')
@ApiTags('Users 🧑‍🤝‍🧑')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBody({ type: SignUpRequest })
  @ApiOkResponse({ type: SignUpResponse })
  @Post('/signUp')
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-type', 'application/json')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiBody({ type: LoginUserRequest })
  @ApiOkResponse({ type: LoginUserResponce })
  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  login(@Request() req) {
    return { user: req.user, msg: 'Logged in' };
  }

  @ApiOkResponse({ type: LoginCheckResponse })
  @Get('/login-check')
  @UseGuards(AuthenticatedGuard)
  loginCheck(@Request() req) {
    return req.user;
  }

  @ApiOkResponse({ type: LogoutUserResponse })
  @Get('/logout')
  logout(@Request() req) {
    req.session.destroy();
    return {
      msg: 'сессия закончена',
    };
  }
}
