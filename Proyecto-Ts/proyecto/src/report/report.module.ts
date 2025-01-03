import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportResolver } from './resolvers/report.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [ReportService, ReportResolver]
})
export class ReportModule {} 
