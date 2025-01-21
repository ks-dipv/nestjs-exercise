import { Controller, Get, Query } from '@nestjs/common';
import { CountriesService } from './services/countries.service';
import { GetCountriesList } from './dtos/get-countries-list.dto';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  public getCountries(@Query() getCountriesList: GetCountriesList) {
    return this.countriesService.getCountries(getCountriesList);
  }
}
