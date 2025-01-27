import { Controller, Get, Query } from '@nestjs/common';
import { CountriesService } from './services/countries.service';
import { GetCountriesList } from './dtos/get-countries-list.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('countries')
@ApiTags('Countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  @ApiOperation({
    summary: 'Fetches a list of Countries',
  })
  @ApiResponse({
    status: 200,
    description: 'Countries fetched successfully based on the query',
  })
  @ApiQuery({
    name: 'name',
    type: 'string',
    required: false,
    description: 'return countries based on query',
    example: 'India',
  })
  @ApiQuery({
    name: 'code',
    type: 'string',
    required: false,
    description: 'return country based on the code given in query',
    example: 'In',
  })
  public getCountries(@Query() getCountriesList: GetCountriesList) {
    const { name, code } = getCountriesList;
    return this.countriesService.getCountries(name, code);
  }
}
