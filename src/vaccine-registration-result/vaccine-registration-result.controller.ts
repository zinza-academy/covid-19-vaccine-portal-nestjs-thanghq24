import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { VaccineRegistrationResultService } from './vaccine-registration-result.service';
import { UpdateVaccineRegistrationResultDto } from './dto/update-vaccine-registration-result.dto';
import {
  AllowedRoles,
  Roles,
} from 'src/auth/decorator/allowed-roles.decorator';

@Controller('vaccine-registration-results')
export class VaccineRegistrationResultController {
  constructor(
    private readonly vaccineRegistrationResultService: VaccineRegistrationResultService,
  ) {}

  @AllowedRoles(Roles.Admin)
  @Get()
  findAll() {
    return this.vaccineRegistrationResultService.findAll();
  }

  @AllowedRoles(Roles.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vaccineRegistrationResultService.findOne(+id);
  }

  @AllowedRoles(Roles.Admin)
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

  @AllowedRoles(Roles.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vaccineRegistrationResultService.remove(+id);
  }
}
