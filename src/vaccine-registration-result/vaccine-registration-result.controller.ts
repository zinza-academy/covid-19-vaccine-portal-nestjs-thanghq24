import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { VaccineRegistrationResultService } from './vaccine-registration-result.service';
import { UpdateVaccineRegistrationResultDto } from './dto/update-vaccine-registration-result.dto';
import {
  AllowedRoles,
  ROLES,
} from 'src/auth/decorator/allowed-roles.decorator';

@Controller('vaccine-registration-result')
export class VaccineRegistrationResultController {
  constructor(
    private readonly vaccineRegistrationResultService: VaccineRegistrationResultService,
  ) {}

  @AllowedRoles(ROLES.ADMIN)
  @Get()
  findAll() {
    return this.vaccineRegistrationResultService.findAll();
  }

  @AllowedRoles(ROLES.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vaccineRegistrationResultService.findOne(+id);
  }

  @AllowedRoles(ROLES.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateVaccineRegistrationResultDto: UpdateVaccineRegistrationResultDto,
  ) {
    return this.vaccineRegistrationResultService.update(
      +id,
      updateVaccineRegistrationResultDto,
    );
  }

  @AllowedRoles(ROLES.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vaccineRegistrationResultService.remove(+id);
  }
}
