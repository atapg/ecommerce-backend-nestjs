import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './interfaces/users.interface';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Errors } from '../utils/errors';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = this.usersRepository.create(createUserDto);
      await this.usersRepository.save(newUser);

      return {
        message: 'User registered successfully',
      };
    } catch (e) {
      Errors.error(e);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: any) {
    try {
      const user = await this.usersRepository.findOneBy({ id });

      delete user.password;

      return user;
    } catch (e) {
      Errors.error(e);
    }
  }

  async findOneByAttr(attr: object): Promise<IUser> | null {
    try {
      const user = await this.usersRepository.findOneBy({
        [Object.keys(attr)[0]]: attr[Object.keys(attr)[0]],
      });

      delete user.password;

      return user;
    } catch (e) {
      Errors.error(e);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
