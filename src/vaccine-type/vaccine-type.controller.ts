import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VaccineTypeService } from './vaccine-type.service';
import { CreateVaccineTypeDto } from './dto/create-vaccine-type.dto';
import { UpdateVaccineTypeDto } from './dto/update-vaccine-type.dto';
import {
  AllowedRoles,
  Roles,
} from 'src/auth/decorator/allowed-roles.decorator';

@Controller('vaccine-types')
export class VaccineTypeController {
  constructor(private readonly vaccineTypeService: VaccineTypeService) {}

  @AllowedRoles(Roles.Admin)
  @Post()
  create(@Body() createVaccineTypeDto: CreateVaccineTypeDto) {
    return this.vaccineTypeService.create(createVaccineTypeDto);
  }

  @AllowedRoles(Roles.Admin)
  @Get()
  findAll() {
    return this.vaccineTypeService.findAll();
  }

  @AllowedRoles(Roles.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vaccineTypeService.findOne(+id);
  }

  @AllowedRoles(Roles.Admin)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVaccineTypeDto: UpdateVaccineTypeDto,
  ) {
    return this.vaccineTypeService.update(+id, updateVaccineTypeDto);
  }

  @AllowedRoles(Roles.Admin)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.vaccineTypeService.remove(+id);
    return { message: 'ok' };
  }
}
