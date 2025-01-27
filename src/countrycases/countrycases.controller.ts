import { Controller, Get, Query } from '@nestjs/common';
import { CountrycasesService } from './services/countrycases.service';
import { getCountryCases } from './dtos/get-country-cases.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('countrycases')
@ApiTags('Country wise Cases')
export class CountrycasesController {
  constructor(private readonly countryCase: CountrycasesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get cases numbers country wise',
  })
  @ApiResponse({
    status: 200,
    description: 'Countries cases data fetched successfully based on the query',
  })
  @ApiQuery({
    name: 'fromDate',
    type: 'string',
    required: false,
    description: 'return countries total data based on query',
    example: '2020-01-11',
  })
  @ApiQuery({
    name: 'toDate',
    type: 'string',
    required: false,
    description: 'return countries total data based on query',
    example: '2020-01-25',
  })
  @ApiQuery({
    name: 'confirmedGte',
    type: 'number',
    required: false,
    description: 'return total data based on given in query',
    example: 500,
  })
  @ApiQuery({
    name: 'confirmedLte',
    type: 'number',
    required: false,
    description: 'return total data based on given in query',
    example: 500,
  })
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
