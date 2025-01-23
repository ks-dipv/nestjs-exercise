import { Controller, Get, Query } from '@nestjs/common';
import { CasesService } from './services/cases.service';
import { GetCasesDto } from './dtos/get-cases-detail.dto';

@Controller('cases')
export class CasesController {
  constructor(private readonly casesService: CasesService) {}

  @Get()
  public getCases(@Query() getCases: GetCasesDto) {
    const { fromDate, toDate, countryCode } = getCases;
    return this.casesService.getCases(fromDate, toDate, countryCode);
  }
}
