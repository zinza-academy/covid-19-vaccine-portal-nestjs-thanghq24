import { PartialType } from '@nestjs/mapped-types';
import { CreateVaccineRegistrationResultDto } from './create-vaccine-registration-result.dto';

export class UpdateVaccineRegistrationResultDto extends PartialType(CreateVaccineRegistrationResultDto) {}
