import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user.entity';
import { CrimeReport } from './crime-report.entity';
import { databaseConfig } from './config/database.config';


@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([User, CrimeReport]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}