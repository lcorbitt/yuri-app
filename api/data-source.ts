import { DataSource } from 'typeorm';
import { databaseConfig } from './src/config/database.config';

export const AppDataSource = new DataSource(databaseConfig);
