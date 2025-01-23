import { Injectable } from '@nestjs/common';
import cases from '../../data/timeseries.json';
import countries from '../../data/countries.json';

@Injectable()
export class CasesService {
  private timeseries = cases;
  private countries = countries;

  getCases(fromDate?: string, toDate?: string, countryCode?: string) {
    if (!countryCode && !fromDate && !toDate) {
      let allData = [];

      Object.keys(this.timeseries).forEach((country) => {
        allData = allData.concat(this.timeseries[country]);
      });

      const total = allData.reduce(
        (acc, record) => {
          acc.confirmed += record.confirmed;
          acc.deaths += record.deaths;
          acc.recovered += record.recovered;
          return acc;
        },
        { confirmed: 0, deaths: 0, recovered: 0 },
      );

      return total;
    }

    if (countryCode) {
      const countryName = Object.keys(this.countries).find(
        (key) => this.countries[key].code === countryCode,
      );

      let countryData = this.timeseries[countryName];

      if (fromDate || toDate) {
        const from = fromDate ? new Date(fromDate) : new Date('2000-01-01');
        const to = toDate ? new Date(toDate) : new Date();

        countryData = countryData.filter((record) => {
          const recordDate = new Date(record.date);
          return recordDate >= from && recordDate <= to;
        });
      }

      return {
        country: countryName,
        data: countryData,
      };
    }

    const filteredData = [];

    Object.keys(this.timeseries).forEach((country) => {
      const countryData = this.timeseries[country];
      const from = fromDate ? new Date(fromDate) : new Date('2000-01-01');
      const to = toDate ? new Date(toDate) : new Date();

      const dataInRange = countryData.filter((record) => {
        const recordDate = new Date(record.date);
        return recordDate >= from && recordDate <= to;
      });

      if (dataInRange.length > 0) {
        filteredData.push({
          country,
          data: dataInRange,
        });
      }
    });

    return filteredData;
  }
}
