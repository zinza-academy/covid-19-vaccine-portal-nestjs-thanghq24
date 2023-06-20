import { Controller, Get, Param } from '@nestjs/common';
import { DistrictsService } from './districts.service';
import { Public } from 'src/auth/decorator/public-route.decorator';

@Public()
@Controller('districts')
export class DistrictsController {
  constructor(private readonly districtsService: DistrictsService) {}

  @Get()
  findAll() {
    return this.districtsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.districtsService.findOne(+id);
  }

  @Get('by-province/:provinceId')
  findByProvince(@Param('provinceId') provinceId: string) {
    return this.districtsService.findByProvince(+provinceId);
  }
}
