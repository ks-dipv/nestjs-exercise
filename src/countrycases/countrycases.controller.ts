import { Controller, Get, Query } from '@nestjs/common';
import { CountrycasesService } from './services/countrycases.service';
import { getCountryCases } from './dtos/get-country-cases.dto';

@Controller('countrycases')
export class CountrycasesController {
  constructor(private readonly countryCase: CountrycasesService) {}

  @Get()
  public getCases(@Query() getCountryCases: getCountryCases) {
    const { fromDate, toDate, confirmedGte, confirmedLte } = getCountryCases;
    return this.countryCase.getCountryCase(
      fromDate,
      toDate,
      confirmedGte,
      confirmedLte,
    );
  }
}
