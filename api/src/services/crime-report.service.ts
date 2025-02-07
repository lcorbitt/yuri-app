import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrimeReport } from '../crime-report.entity';

@Injectable()
export class CrimeReportService {
  constructor(
    @InjectRepository(CrimeReport)
    private crimeReportRepository: Repository<CrimeReport>,
  ) {}

  async create(data: Partial<CrimeReport>): Promise<CrimeReport> {
    console.log('IN API SERVICE', data);
    const crimeReport = this.crimeReportRepository.create(data);
    return await this.crimeReportRepository.save(crimeReport);
  }

  async findAll(): Promise<CrimeReport[]> {
    return await this.crimeReportRepository.find();
  }

  async findOne(id: number): Promise<CrimeReport> {
    return await this.crimeReportRepository.findOne({ where: { id } });
  }
}
