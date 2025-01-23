import { Type } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional } from 'class-validator';

export class GetMonthCases {
  @IsOptional()
  @IsDateString()
  fromDate?: string;

  @IsOptional()
  @IsDateString()
  toDate?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  confirmedGte?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  confirmedLte?: number;
}
