import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateVaccineRegistrationResultDto {
  @IsNumber()
  @IsNotEmpty()
  vaccineType: number;

  @IsNumber()
  @IsNotEmpty()
  vaccinationSite: number;

  @IsNumber()
  @IsNotEmpty()
  vaccineRegistration: number;

  @IsDate()
  injectingTime: string;
}
