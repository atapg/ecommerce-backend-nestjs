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

@Controller('users')
export class UsersController {
  constructor(private readonly usersProvider: UsersProvider) {}

  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersProvider.registerUser(createUserDto);
  }
}
