import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { STATUS } from 'src/entities/vaccine_registration.entity';

export class CreateVaccineRegistrationDto {
  status: STATUS;

  @IsNumber()
  @IsNotEmpty()
  priorityType: number;

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

  @IsNumber()
  @IsNotEmpty()
  dayPhase: number;

  @IsNumber()
  @IsNotEmpty()
  user: number;
}
