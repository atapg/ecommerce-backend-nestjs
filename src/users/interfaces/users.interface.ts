import UserRole from '../enums/role.enum';

export interface IUser {
  id: string;
  name: string;
  lastName: string;
  phone: string;
  email: string;
  username: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
