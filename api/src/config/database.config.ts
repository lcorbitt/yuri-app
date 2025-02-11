export const databaseConfig = {
  type: 'postgres' as const,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'lukascorbitt',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'yuri_development',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
};
