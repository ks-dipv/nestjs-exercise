import { Injectable } from '@nestjs/common';
import timeseriesData from '../../data/timeseries.json';
import countriesData from '../../data/countries.json';
import { Workbook } from 'exceljs';

@Injectable()
export class ExcelService {
  private countries = countriesData;
  private timeseries = timeseriesData;

  async generateExcel(isoCodes?: string[], year?: number) {
    const filteredCountries = isoCodes
      ? Object.keys(this.countries).filter((country) =>
          isoCodes.includes(this.countries[country].code),
        )
      : Object.keys(this.countries);

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('COVID Data');

    worksheet.columns = [
      { header: 'Country', key: 'country', width: 30 },
      { header: 'Month-Year', key: 'monthYear', width: 15 },
      { header: 'Total Confirmed', key: 'confirmed', width: 20 },
      { header: 'Total Deaths', key: 'deaths', width: 20 },
      { header: 'Total Recovered', key: 'recovered', width: 20 },
    ];

    filteredCountries.forEach((country) => {
      const data = this.timeseries[country] || [];
      const monthlyData = {};

      data.forEach(({ date, confirmed, deaths, recovered }) => {
        const [yr, month] = date.split('-');
        if (year && parseInt(yr) !== year) return;

        const key = `${yr}-${month}`;
        if (!monthlyData[key]) {
          monthlyData[key] = { confirmed: 0, deaths: 0, recovered: 0 };
        }

        monthlyData[key].confirmed += confirmed;
        monthlyData[key].deaths += deaths;
        monthlyData[key].recovered += recovered;
      });

      Object.entries(monthlyData).forEach(([monthYear, stats]: any) => {
        worksheet.addRow({
          country,
          monthYear,
          confirmed: stats.confirmed,
          deaths: stats.deaths,
          recovered: stats.recovered,
        });
      });
    });

    return workbook;
  }
}
