import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountriesModule } from './countries/countries.module';
import { CasesModule } from './cases/cases.module';
import { CountrycasesModule } from './countrycases/countrycases.module';
import { CovidModule } from './covid/covid.module';
import { TopcountriesModule } from './topcountries/topcountries.module';
import { ExcelModule } from './excel/excel.module';

@Module({
  imports: [
    CountriesModule,
    CasesModule,
    CountrycasesModule,
    CovidModule,
    TopcountriesModule,
    ExcelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
