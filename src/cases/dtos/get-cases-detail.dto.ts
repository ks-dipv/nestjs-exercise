import { IsDateString, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetCasesDto {
  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({
    description: 'Enter the starting date',
    example: 'India',
  })
  fromDate?: string;

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({
    description: 'Enter the ending date',
    example: 'India',
  })
  toDate?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Enter the country code',
    example: 'India',
  })
  countryCode?: string;
}
