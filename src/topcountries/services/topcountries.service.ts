import { Injectable } from '@nestjs/common';
import cases from '../../data/timeseries.json';
import { parse } from 'date-fns';

@Injectable()
export class TopcountriesService {
  private timeseries = cases;
  getCountryCase(fromDate?: string, toDate?: string, top?: number) {
    const result = [];
    const fromParsed = fromDate
      ? parse(fromDate, 'yyyy-MM-dd', new Date())
      : null;
    const toParsed = toDate ? parse(toDate, 'yyyy-MM-dd', new Date()) : null;
    for (const country in this.timeseries) {
      if (this.timeseries.hasOwnProperty(country)) {
        let totalConfirmed = 0;
        let totalDeaths = 0;
        let totalRecoverd = 0;
        this.timeseries[country].forEach((entry) => {
          const date = parse(entry.date, 'yyyy-MM-dd', new Date());
          if (
            (fromParsed && date < fromParsed) ||
            (toParsed && date > toParsed)
          )
            return;
          totalConfirmed += entry.confirmed;
          totalDeaths += entry.deaths;
          totalRecoverd += entry.recovered;
        });
        if (totalConfirmed > 0) {
          result.push({ country, totalConfirmed, totalDeaths, totalRecoverd });
        }
      }
    }
    return result
      .sort((a, b) => b.totalConfirmed - a.totalConfirmed)
      .slice(0, top);
  }
}
