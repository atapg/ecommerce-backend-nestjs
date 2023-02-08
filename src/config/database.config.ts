import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const DatabaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DBNAME,
  synchronize: true, //TODO delete in production
  // logging: true,
  entities: [
    'dist/**/entities/*.entity.js' || 'dist/src/**/entities/*.entity.js',
  ],
};

export default DatabaseConfig;
