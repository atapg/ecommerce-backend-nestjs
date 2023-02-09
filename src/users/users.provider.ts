import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import Bcrypt from '../utils/bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import Token from '../utils/token';

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
    createUserDto.password = await Bcrypt.hashPassword(createUserDto.password);

    // save into db and register
    return this.usersService.create(createUserDto);
  }

  async authenticateUser(loginUserDto: LoginUserDto) {
    // find user by id
    const user = await this.usersService.findOneByAttr({
      username: loginUserDto.username,
    });

    // username is not correct (there is no user in db with this username)
    if (!user)
      throw new HttpException('Incorrect Data', HttpStatus.BAD_REQUEST);

    // compare password with the hashed one
    const doesPasswordMatches = await Bcrypt.comparePassword(
      loginUserDto.password,
      user.password,
    );

    // entered password does not fit with the hashed password
    if (!doesPasswordMatches)
      throw new HttpException('Incorrect Data', HttpStatus.BAD_REQUEST);

    // generate token
    const token = Token.generateToken(user.id);

    // delete password from user object so we can return it
    delete user.password;

    // delete returning role to user
    delete user.role;

    return {
      ...user,
      token,
    };
  }
}
