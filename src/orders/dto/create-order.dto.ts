import { IsNotEmpty, IsString } from 'class-validator';
import StatusEnum from '../enums/status.enum';
import { User } from '../../users/entities/user.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  totalPrice: number;

  status: StatusEnum;

  processStatus: StatusEnum;

  adminNote: string;

  userId: User;

  details: string;
}
