import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersProvider } from './users.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthenticationMiddleware } from './middlewares/authentication.middleware';
import { IsAdminMiddleware } from './middlewares/isAdmin.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersProvider],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer): any {
    //TODO update middlewares

    // Global middleware for authenticating users
    consumer.apply(AuthenticationMiddleware).forRoutes('categories');

    // Middleware for just admin routes
    consumer
      .apply(IsAdminMiddleware)
      .forRoutes(
        { path: 'categories', method: RequestMethod.POST },
        { path: 'categories', method: RequestMethod.PATCH },
        { path: 'categories', method: RequestMethod.DELETE },
        { path: 'products', method: RequestMethod.POST },
        { path: 'products', method: RequestMethod.PATCH },
        { path: 'products', method: RequestMethod.DELETE },
      );
  }
}
