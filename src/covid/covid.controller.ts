import { Controller, Get, Query } from '@nestjs/common';
import { CovidService } from './services/covid.service';
import { GetMonthCases } from './dtos/get-data.dto';

@Controller('covid')
export class CovidController {
  constructor(private readonly covidCase: CovidService) {}

  @Get()
  public getCases(@Query() getMonthCases: GetMonthCases) {
    const { fromDate, toDate, confirmedGte, confirmedLte } = getMonthCases;
    return this.covidCase.getCountryCase(
      fromDate,
      toDate,
      confirmedGte,
      confirmedLte,
    );
  }
}
