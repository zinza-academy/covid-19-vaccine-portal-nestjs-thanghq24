import { PartialType } from '@nestjs/mapped-types';
import { CreateVaccineTypeDto } from './create-vaccine-type.dto';

export class UpdateVaccineTypeDto extends PartialType(CreateVaccineTypeDto) {}
