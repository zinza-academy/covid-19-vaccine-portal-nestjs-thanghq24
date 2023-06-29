import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class FindVaccineRegistrationDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  userId: number = null;
}
