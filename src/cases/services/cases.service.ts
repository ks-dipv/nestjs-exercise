import { Injectable } from '@nestjs/common';
import cases from '../../data/timeseries.json';
import countries from '../../data/countries.json';

@Injectable()
export class CasesService {
  private timeseries = cases;
  private countries = countries;

  getCases(fromDate?: string, toDate?: string, countryCode?: string) {
    let allData = [];

    if (!countryCode && !fromDate && !toDate) {
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
      const cCode = countryCode.toLowerCase();
      const countryName = Object.keys(this.countries).find((key) => {
        const country = this.countries[key];
        return country.code && country.code.toLowerCase() === cCode;
      });

      if (countryName) {
        let countryData = this.timeseries[countryName];

        if (fromDate || toDate) {
          const from = fromDate ? new Date(fromDate) : new Date('2000-01-01');
          const to = toDate ? new Date(toDate) : new Date();

          countryData = countryData.filter((record) => {
            const recordDate = new Date(record.date);
            return recordDate >= from && recordDate <= to;
          });
        }

        const total = countryData.reduce(
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
    }

    Object.keys(this.timeseries).forEach((country) => {
      const countryData = this.timeseries[country];
      const from = fromDate ? new Date(fromDate) : new Date();
      const to = toDate ? new Date(toDate) : new Date();

      const dataInRange = countryData.filter((record) => {
        const recordDate = new Date(record.date);
        return recordDate >= from && recordDate <= to;
      });

      allData = allData.concat(dataInRange);
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
}
