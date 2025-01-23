import { Injectable } from '@nestjs/common';
import cases from '../../data/timeseries.json';
import { parse, format } from 'date-fns';

@Injectable()
export class CovidService {
  private timeseries = cases;
  getCountryCase(
    fromDate?: string,
    toDate?: string,
    confirmedGte?: number,
    confirmedLte?: number,
  ) {
    const result = [];

    for (const country in this.timeseries) {
      if (this.timeseries.hasOwnProperty(country)) {
        const monthlyData: {
          [key: string]: {
            confirmed: number;
            deaths: number;
            recovered: number;
          };
        } = {};

        this.timeseries[country].forEach((entry) => {
          const date = parse(entry.date, 'yyyy-MM-dd', new Date());
          const month = format(date, 'yyyy-MM');

          if (fromDate && date < parse(fromDate, 'yyyy-MM-dd', new Date()))
            return;
          if (toDate && date > parse(toDate, 'yyyy-MM-dd', new Date())) return;

          if (!monthlyData[month]) {
            monthlyData[month] = { confirmed: 0, deaths: 0, recovered: 0 };
          }

          monthlyData[month].confirmed += entry.confirmed;
          monthlyData[month].deaths += entry.deaths;
          monthlyData[month].recovered += entry.recovered;
        });

        for (const month in monthlyData) {
          const confirmedCases = monthlyData[month].confirmed;

          const isWithinRange =
            (confirmedGte === undefined || confirmedCases >= confirmedGte) &&
            (confirmedLte === undefined || confirmedCases <= confirmedLte);

          if (isWithinRange) {
            result.push({
              country,
              month,
              confirmed: confirmedCases,
              deaths: monthlyData[month].deaths,
              recovered: monthlyData[month].recovered,
            });
          }
        }
      }
    }

    return result;
  }
}
