import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VaccineRegistrationResultService } from './vaccine-registration-result.service';
import { CreateVaccineRegistrationResultDto } from './dto/create-vaccine-registration-result.dto';
import { UpdateVaccineRegistrationResultDto } from './dto/update-vaccine-registration-result.dto';

@Controller('vaccine-registration-result')
export class VaccineRegistrationResultController {
  constructor(
    private readonly vaccineRegistrationResultService: VaccineRegistrationResultService,
  ) {}

  @Post()
  create(
    @Body()
    createVaccineRegistrationResultDto: CreateVaccineRegistrationResultDto,
  ) {
    return this.vaccineRegistrationResultService.create(
      createVaccineRegistrationResultDto,
    );
  }

  @Get()
  findAll() {
    return this.vaccineRegistrationResultService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vaccineRegistrationResultService.findOne(+id);
  }

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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vaccineRegistrationResultService.remove(+id);
  }
}
