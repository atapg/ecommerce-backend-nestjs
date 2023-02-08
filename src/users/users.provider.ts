import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Injectable()
export class UsersProvider {
  constructor(private readonly usersService: UsersService) {}

  registerUser(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
