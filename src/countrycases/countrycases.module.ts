import { Module } from '@nestjs/common';
import { CountrycasesController } from './countrycases.controller';
import { CountrycasesService } from './services/countrycases.service';

@Module({
  controllers: [CountrycasesController],
  providers: [CountrycasesService],
})
export class CountrycasesModule {}
