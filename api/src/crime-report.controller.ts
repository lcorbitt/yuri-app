import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CrimeReport } from './crime-report.entity';
import { CrimeReportService } from './services/crime-report.service';

@Controller('crime-reports')
export class CrimeReportController {
  constructor(private readonly crimeReportService: CrimeReportService) {}

  @Post()
  async create(@Body() data: Partial<CrimeReport>) {
    return this.crimeReportService.create(data);
  }

  @Get()
  async findAll() {
    return this.crimeReportService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.crimeReportService.findOne(parseInt(id));
  }
}
