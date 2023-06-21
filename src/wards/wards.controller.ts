import { Controller, Get, Param } from '@nestjs/common';
import { WardsService } from './wards.service';
import { Public } from 'src/auth/decorator/public-route.decorator';

@Public()
@Controller('wards')
export class WardsController {
  constructor(private readonly wardsService: WardsService) {}

  @Get()
  findAll() {
    return this.wardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wardsService.findOne(+id);
  }

  @Get('by-district/:districtId')
  findByDistrict(@Param('districtId') districtId: string) {
    return this.wardsService.findByDistrict(+districtId);
  }
}
