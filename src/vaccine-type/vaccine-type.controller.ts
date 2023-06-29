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

@Controller('vaccine-type')
export class VaccineTypeController {
  constructor(private readonly vaccineTypeService: VaccineTypeService) {}

  @Post()
  create(@Body() createVaccineTypeDto: CreateVaccineTypeDto) {
    return this.vaccineTypeService.create(createVaccineTypeDto);
  }

  @Get()
  findAll() {
    return this.vaccineTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vaccineTypeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVaccineTypeDto: UpdateVaccineTypeDto,
  ) {
    return this.vaccineTypeService.update(+id, updateVaccineTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vaccineTypeService.remove(+id);
  }
}
