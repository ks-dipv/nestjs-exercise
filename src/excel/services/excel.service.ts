import { Injectable } from '@nestjs/common';
import * as timeseriesData from '../../data/timeseries.json';
import countriesData from '../../data/countries.json';
import { Workbook } from 'exceljs';

@Injectable()
export class ExcelService {
  private country = countriesData;
  private timeseries = timeseriesData;
  async generateExcel(isoCodes?: string[], year?: number) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Covid Data');

    worksheet.columns = [
      { header: 'Country', key: 'country', width: 20 },
      { header: 'Month', key: 'month', width: 10 },
      { header: 'Total Confirmed', key: 'confirmed', width: 15 },
      { header: 'Total Deaths', key: 'deaths', width: 15 },
      { header: 'Total Recovered', key: 'recovered', width: 15 },
    ];

    console.log(year);

    if (isoCodes) {
      const countryName = Object.entries(this.country).find((c) => {
        return c[1]['code'] == isoCodes;
      })[0];

      const monthlyData: {
        [key: string]: {
          confirmed: number;
          deaths: number;
          recovered: number;
        };
      } = {};

      this.timeseries[countryName]?.forEach((entry) => {
        const entryDate = new Date(entry.date);
        if (year && entryDate.getFullYear() !== year) {
          return;
        }

        const month = this.formatMonth(entry.date);
        if (!monthlyData[month]) {
          monthlyData[month] = { confirmed: 0, deaths: 0, recovered: 0 };
        }

        monthlyData[month].confirmed += entry.confirmed;
        monthlyData[month].deaths += entry.deaths;
        monthlyData[month].recovered += entry.recovered;
      });

      for (const [month] of Object.entries(monthlyData)) {
        worksheet.addRow({
          country: countryName,
          month,
          confirmed: monthlyData[month].confirmed,
          deaths: monthlyData[month].deaths,
          recovered: monthlyData[month].recovered,
        });
      }
      return workbook;
    }

    for (const country of Object.entries(this.timeseries)) {
      const monthlyData: {
        [key: string]: {
          confirmed: number;
          deaths: number;
          recovered: number;
        };
      } = {};

      const cname: string = country[0];

      for (const [key, value] of Object.entries(this.timeseries[cname])) {
        // console.log(value['date']);
        const entryDate = new Date(value['date']);

        const dyear = entryDate.getFullYear();

        // console.log(dyear);

        // value.filter((entry) => new Date(entry['date']).getFullYear() === year)

        if (year && dyear === year) {
          const month = this.formatMonth(value['date']);
          if (!monthlyData[month]) {
            monthlyData[month] = { confirmed: 0, deaths: 0, recovered: 0 };
          }

          monthlyData[month].confirmed += value['confirmed'];
          monthlyData[month].deaths += value['deaths'];
          monthlyData[month].recovered += value['recovered'];
        } else {
          const month = this.formatMonth(value['date']);
          if (!monthlyData[month]) {
            monthlyData[month] = { confirmed: 0, deaths: 0, recovered: 0 };
          }

          monthlyData[month].confirmed += value['confirmed'];
          monthlyData[month].deaths += value['deaths'];
          monthlyData[month].recovered += value['recovered'];
        }
      }

      for (const [month] of Object.entries(monthlyData)) {
        worksheet.addRow({
          country: country[0],
          month,
          confirmed: monthlyData[month].confirmed,
          deaths: monthlyData[month].deaths,
          recovered: monthlyData[month].recovered,
        });
      }
    }

    return workbook;
  }

  private formatMonth(date: string): string {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  }
}
