import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsBoolean, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {

  @IsNumber()
  @IsPositive()
  public id: number;

  @IsBoolean()
  @IsOptional()
  public available: boolean;

}
