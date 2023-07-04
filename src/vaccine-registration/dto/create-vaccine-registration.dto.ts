import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateVaccineRegistrationDto {
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
