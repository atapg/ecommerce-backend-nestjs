import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersProvider } from './users.provider';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersProvider],
})
export class UsersModule {}
