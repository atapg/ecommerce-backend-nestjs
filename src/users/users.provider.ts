import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Injectable()
export class UsersProvider {
  constructor(private readonly usersService: UsersService) {}

  async registerUser(createUserDto: CreateUserDto) {
    // check duplicate email and username
    //email
    const emailHasAlreadyRegistered = await this.usersService.findOneByAttr({
      email: createUserDto.email,
    });

    if (emailHasAlreadyRegistered)
      throw new HttpException(
        'Email has already taken',
        HttpStatus.BAD_GATEWAY,
      );

    // duplicate phone check
    const phoneHasAlreadyRegistered = await this.usersService.findOneByAttr({
      phone: createUserDto.phone,
    });

    if (phoneHasAlreadyRegistered)
      throw new HttpException(
        'Phone has already taken',
        HttpStatus.BAD_GATEWAY,
      );

    // duplicate username
    const usernameHasAlreadyRegistered = await this.usersService.findOneByAttr({
      username: createUserDto.username,
    });

    if (usernameHasAlreadyRegistered)
      throw new HttpException(
        'Username has already taken',
        HttpStatus.BAD_GATEWAY,
      );

    // hash pass

    // save into db and register

    return this.usersService.create(createUserDto);
  }
}
