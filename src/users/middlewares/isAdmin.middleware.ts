import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import Token from '../../utils/token';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from '../users.service';
import { Errors } from '../../utils/errors';

@Injectable()
export class IsAdminMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const user = await this.usersService.findOne(req.userId);

    if (user.role !== 'admin') Errors.unauthorized();
    console.log('here');

    next();
  }
}
