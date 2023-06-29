import { Module } from '@nestjs/common';
import { VaccineTypeService } from './vaccine-type.service';
import { VaccineTypeController } from './vaccine-type.controller';

@Module({
  controllers: [VaccineTypeController],
  providers: [VaccineTypeService],
})
export class VaccineTypeModule {}
