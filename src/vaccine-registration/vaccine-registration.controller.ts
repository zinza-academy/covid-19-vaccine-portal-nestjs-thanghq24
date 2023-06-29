import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VaccineRegistrationService } from './vaccine-registration.service';
import { CreateVaccineRegistrationDto } from './dto/create-vaccine-registration.dto';
import { UpdateVaccineRegistrationDto } from './dto/update-vaccine-registration.dto';

@Controller('vaccine-registration')
export class VaccineRegistrationController {
  constructor(
    private readonly vaccineRegistrationService: VaccineRegistrationService,
  ) {}

  @Post()
  create(@Body() createVaccineRegistrationDto: CreateVaccineRegistrationDto) {
    return this.vaccineRegistrationService.create(createVaccineRegistrationDto);
  }

  @Get()
  findAll() {
    return this.vaccineRegistrationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vaccineRegistrationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVaccineRegistrationDto: UpdateVaccineRegistrationDto,
  ) {
    return this.vaccineRegistrationService.update(
      +id,
      updateVaccineRegistrationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vaccineRegistrationService.remove(+id);
  }
}
