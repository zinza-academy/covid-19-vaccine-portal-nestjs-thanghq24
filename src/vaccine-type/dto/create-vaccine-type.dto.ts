import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVaccineTypeDto {
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  batchNumber: string;
}
