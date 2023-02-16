import { HttpException, HttpStatus } from '@nestjs/common';

export class Errors {
  static notFoundError(thing?: string) {
    if (thing) {
      throw new HttpException(`${thing} Not Found`, HttpStatus.NOT_FOUND);
    } else {
      throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
    }
  }

  static error(e) {
    // Use for debugging
    throw new HttpException(
      e.response ? e.response : 'Something went wrong',
      HttpStatus.BAD_REQUEST,
    );
  }

  static unauthorized() {
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }

  static somethingWentWrong() {
    throw new HttpException('Something Went Wrong', HttpStatus.BAD_REQUEST);
  }

  static customError(error) {
    throw new HttpException(error, HttpStatus.BAD_REQUEST);
  }
}
