import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersProvider } from './users.provider';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersProvider: UsersProvider) {}

  @Post('/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersProvider.registerUser(createUserDto);
  }

  @Post('/authenticate')
  authenticate(@Body() loginUserDto: LoginUserDto) {
    return this.usersProvider.authenticateUser(loginUserDto);
  }
}
