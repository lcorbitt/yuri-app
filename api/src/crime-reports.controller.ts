import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
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
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const report = await this.crimeReportService.findOne(id);
    if (!report) {
      throw new NotFoundException(`Crime report with ID ${id} not found`);
    }

    return report;
  }
}
