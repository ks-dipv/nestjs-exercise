import { Injectable } from '@nestjs/common';
import countries from '../../data/countries.json';
import { GetCountriesList } from '../dtos/get-countries-list.dto';

@Injectable()
export class CountriesService {
  getCountries(cntry: GetCountriesList) {
    let result = countries;
    const { name, code } = cntry;

    if (code) {
      result = Object.keys(code).toString();
    }

    return result;
  }
}
