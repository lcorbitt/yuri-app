import { DataSource } from 'typeorm';
import { databaseConfig } from './config/database.config';
const config = {
  ...databaseConfig,
};

export const AppDataSource = new DataSource(config);
