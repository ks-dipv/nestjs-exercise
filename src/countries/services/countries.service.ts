import { Injectable } from '@nestjs/common';
import countries from '../../data/countries.json';

@Injectable()
export class CountriesService {
  getCountries(name?: string, code?: string) {
    const result = Object.entries(countries);
    const p = [];

    if (name) {
      name = name.toLowerCase();
      // const cnt = Object.keys(result).filter((key) => {
      //   return key.toLowerCase().includes(name);
      // });
      // return Object.entries(result).filter(([key]) => cnt.includes(key));
      for (const [key, value] of result) {
        if (key.toLowerCase().includes(name)) {
          p.push([key, value]);
        }
      }
      return p;
    }

    if (code) {
      code = code.toLowerCase();
      for (const [key, value] of result) {
        if (value['code']?.toLowerCase().includes(code)) {
          p.push([key, value]);
        }
      }
      return p;
    }

    return result;
  }
}
