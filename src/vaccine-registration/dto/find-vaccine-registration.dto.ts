import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { STATUS } from 'src/entities/vaccine-registration.entity';

export class FindVaccineRegistrationDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  userId: number = null;

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
  priorityType: number;

  @MaxLength(10)
  @IsDateString()
  @IsOptional()
  appointmentDate: string;

  @IsEnum(STATUS)
  @IsOptional()
  status: STATUS;
}
