import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import Token from '../../utils/token';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const authorizationHeaderParse = req.headers.authorization.split(' ');

    if (authorizationHeaderParse.length < 2) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const token = authorizationHeaderParse[1];
    const userId = Token.decodeToken(token);

    // const authenticatedUser = await this.usersService.findOne(userId);

    // if (!authenticatedUser)
    //   throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    //
    // delete authenticatedUser.password;

    // req.authenticatedUser = authenticatedUser;

    req.userId = userId;

    console.log(req.userId);

    next();
  }
}
