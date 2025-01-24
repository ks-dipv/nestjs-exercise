import { Module } from '@nestjs/common';
import { ExcelController } from './excel.controller';
import { ExcelService } from './services/excel.service';

@Module({
  controllers: [ExcelController],
  providers: [ExcelService],
})
export class ExcelModule {}
