import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateVaccineRegistrationResultDto {
  @IsNumber()
  @IsNotEmpty()
  vaccineType: number;

  @IsNumber()
  @IsNotEmpty()
  vaccinationSite: number;

  @IsDateString()
  @IsNotEmpty()
  injectingTime: string;
}
