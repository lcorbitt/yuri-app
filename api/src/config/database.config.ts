import { User } from '../user.entity';
import { CrimeReport } from '../crime-report.entity';
import { CrimeComment } from '../crime-comment.entity';
import { CrimeCategory } from '../crime-category.entity';
import { CrimeInvestigation } from '../crime-investigation.entity';
import { Notification } from '../notification.entity';

export const databaseConfig = {
  type: 'postgres' as const,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'lukascorbitt',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'yuri_development',
  entities: [
    User,
    CrimeReport,
    CrimeComment,
    CrimeCategory,
    CrimeInvestigation,
    Notification,
  ],
  migrations: ['migrations/*.ts'],
  synchronize: false,
};
