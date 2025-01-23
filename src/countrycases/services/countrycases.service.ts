import { Injectable } from '@nestjs/common';
import cases from '../../data/timeseries.json';

@Injectable()
export class CountrycasesService {
  private timeseries = cases;
  getCountryCase(
    fromDate: string,
    toDate: string,
    confirmedGte: number,
    confirmedLte: number,
  ) {
    const response = [];

    for (const [country, data] of Object.entries(this.timeseries)) {
      // Filter data by date range
      const filteredData = data.filter((entry) => {
        const entryDate = new Date(entry.date);

        if (fromDate && new Date(fromDate) > entryDate) {
          return false;
        }
        if (toDate && new Date(toDate) < entryDate) {
          return false;
        }
        return true;
      });

      const totals = filteredData.reduce(
        (acc, curr) => {
          acc.confirmed += curr.confirmed;
          acc.deaths += curr.deaths;
          acc.recovered += curr.recovered;
          return acc;
        },
        { confirmed: 0, deaths: 0, recovered: 0 },
      );

      if (
        (confirmedGte !== undefined && totals.confirmed < confirmedGte) ||
        (confirmedLte !== undefined && totals.confirmed > confirmedLte)
      ) {
        continue;
      }

      response.push({
        country,
        totals,
      });
    }

    return response;
  }
}
