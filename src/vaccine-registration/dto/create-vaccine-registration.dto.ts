import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { STATUS } from 'src/entities/vaccine-registration.entity';

export class CreateVaccineRegistrationDto {
  @Type(() => Number)
  @IsEnum(STATUS)
  @IsNotEmpty()
  status: STATUS;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  priorityType: number;

  @Type(() => Number)
  @IsNumber()
  job: number;

  @IsString()
  workplace: string;

  @IsString()
  address: string;

  @MaxLength(10)
  @IsDateString()
  @IsNotEmpty()
  appointmentDate: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  dayPhase: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  user: number;
}
