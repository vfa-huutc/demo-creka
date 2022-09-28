import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
// tslint:disable-next-line
require('dotenv').config({ debug: process.env.APP_DEBUG });
const dbConfig: TypeOrmModuleOptions = {
  type: 'mssql',
  port: Number(process.env.RDS_PORT) || 1433,
  host: process.env.RDS_HOST,
  username: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DATABASE,
  logging: 'all',
  synchronize: false, // Don't use it on production, It will sync entity and modify your database to match with entity
};
export default dbConfig;
