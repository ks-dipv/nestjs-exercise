import { Module } from '@nestjs/common';
import { TopcountriesController } from './topcountries.controller';
import { TopcountriesService } from './services/topcountries.service';

@Module({
  controllers: [TopcountriesController],
  providers: [TopcountriesService],
})
export class TopcountriesModule {}
