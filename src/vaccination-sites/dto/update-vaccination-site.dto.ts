import { PartialType } from '@nestjs/mapped-types';
import { CreateVaccinationSiteDto } from './create-vaccination-site.dto';

export class UpdateVaccinationSiteDto extends PartialType(
  CreateVaccinationSiteDto,
) {}
