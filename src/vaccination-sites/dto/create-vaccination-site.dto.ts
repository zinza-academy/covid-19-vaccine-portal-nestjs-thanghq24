import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateVaccinationSiteDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  address: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  ward: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  manager: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  tableNumber: number;
}
