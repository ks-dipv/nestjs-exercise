import { Module } from '@nestjs/common';
import { CountriesController } from './countries.controller';
import { CountriesService } from './services/countries.service';

@Module({
  controllers: [CountriesController],
  providers: [CountriesService],
})
export class CountriesModule {}
