import { IsEnum, IsNotEmpty } from 'class-validator';
import { VaccineRegistrationStatus } from 'src/entities/vaccine-registration.entity';

export class DecideRegistrationDto {
  @IsEnum(VaccineRegistrationStatus)
  @IsNotEmpty()
  status: VaccineRegistrationStatus;
}
