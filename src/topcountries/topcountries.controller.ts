import { Controller, Get, Query } from '@nestjs/common';
import { TopcountriesService } from './services/topcountries.service';
import { GetTopCountries } from './dtos/get-top-countries.dto';

@Controller('topcountries')
export class TopcountriesController {
  constructor(private readonly topCases: TopcountriesService) {}

  @Get()
  public getCases(@Query() getMonthCases: GetTopCountries) {
    const { fromDate, toDate, top } = getMonthCases;
    return this.topCases.getCountryCase(fromDate, toDate, top);
  }
}
