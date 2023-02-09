import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { HttpException, HttpStatus } from '@nestjs/common';

dotenv.config();

class Token {
  static generateToken(id: any): string {
    return jwt.sign({ id }, `${process.env.JWT_SECRET}`, {
      expiresIn: '1y',
    });
  }

  static decodeToken(token: string): any {
    return jwt.verify(
      token,
      `${process.env.JWT_SECRET}`,
      function (err: any, decoded: any) {
        if (err)
          throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        else return decoded.id;
      },
    );
  }
}

export default Token;
