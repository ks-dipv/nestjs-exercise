import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountriesModule } from './countries/countries.module';
import { CasesModule } from './cases/cases.module';

@Module({
  imports: [CountriesModule, CasesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
