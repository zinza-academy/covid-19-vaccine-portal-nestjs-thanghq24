import { Module } from '@nestjs/common';
import { VaccineTypeService } from './vaccine-type.service';
import { VaccineTypeController } from './vaccine-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VaccineType } from 'src/entities/vaccine-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VaccineType])],
  controllers: [VaccineTypeController],
  providers: [VaccineTypeService],
})
export class VaccineTypeModule {}
