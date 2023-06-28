import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindVaccinationDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  page: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  pageSize: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  ward: number = null;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  district: number = null;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  province: number = null;

  @Type(() => String)
  @IsString()
  @IsOptional()
  name: string = null;

  @Type(() => String)
  @IsString()
  @IsOptional()
  address: string = null;
}
