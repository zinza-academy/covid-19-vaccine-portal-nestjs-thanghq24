import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { toNumber } from 'src/utils/transformer';

export class FindVaccinationDto {
  @Transform((page) => toNumber(page))
  @IsNumber()
  @IsNotEmpty()
  page: number;

  @Transform((pageSize) => toNumber(pageSize))
  @IsNumber()
  @IsNotEmpty()
  pageSize: number;

  @Transform((ward) => toNumber(ward))
  @IsNumber()
  @IsOptional()
  ward: number = null;

  @Transform((district) => toNumber(district))
  @IsNumber()
  @IsOptional()
  district: number = null;

  @Transform((province) => toNumber(province))
  @IsNumber()
  @IsOptional()
  province: number = null;

  @IsString()
  @IsOptional()
  name: string = null;

  @IsString()
  @IsOptional()
  address: string = null;
}
