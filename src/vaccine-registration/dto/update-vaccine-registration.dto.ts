import { PartialType } from '@nestjs/mapped-types';
import { CreateVaccineRegistrationDto } from './create-vaccine-registration.dto';

export class UpdateVaccineRegistrationDto extends PartialType(CreateVaccineRegistrationDto) {}
