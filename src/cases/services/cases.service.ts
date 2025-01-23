import { Injectable } from '@nestjs/common';
import cases from '../../data/timeseries.json';
import countries from '../../data/countries.json';

@Injectable()
export class CasesService {
  private timeseries = cases;
  private countries = countries;

  getCases(fromDate?: string, toDate?: string, countryCode?: string) {
    let result = Object.keys(this.timeseries).map((country) => {
      const data = this.timeseries[country];
      const total = data.reduce(
        (acc, record) => {
          acc.confirmed += record.confirmed;
          acc.deaths += record.deaths;
          acc.recovered += record.recovered;
          return acc;
        },
        { confirmed: 0, deaths: 0, recovered: 0 },
      );
      return { country, ...total };
    });

    if (countryCode) {
      const countryName = Object.keys(this.countries).find(
        (key) => this.countries[key].code === countryCode,
      );
      result = result.filter((entry) => entry.country === countryName);
    }

    if (fromDate && toDate) {
      const from = fromDate ? new Date(fromDate) : new Date('2000-01-01');
      const to = toDate ? new Date(toDate) : new Date();

      result = result.map((entry) => {
        const filteredData = this.timeseries[entry.country].filter((record) => {
          const recordDate = new Date(record.date);
          return recordDate >= from && recordDate <= to;
        });

        const total = filteredData.reduce(
          (acc, record) => {
            acc.confirmed += record.confirmed;
            acc.deaths += record.deaths;
            acc.recovered += record.recovered;
            return acc;
          },
          { confirmed: 0, deaths: 0, recovered: 0 },
        );

        return { country: entry.country, ...total };
      });
    }

    return result;
  }
}
