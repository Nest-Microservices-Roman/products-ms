import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  @Min(1)
  page: number = 1;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  @Min(1)
  limit: number = 10;
}
