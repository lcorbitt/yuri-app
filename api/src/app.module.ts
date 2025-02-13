import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user.entity';
import { CrimeReport } from './crime-report.entity';
import { databaseConfig } from './config/database.config';
import { CrimeReportController } from './crime-reports.controller';
import { CrimeReportService } from './services/crime-report.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([User, CrimeReport]),
  ],
  controllers: [AppController, CrimeReportController],
  providers: [AppService, CrimeReportService],
})
export class AppModule {}
