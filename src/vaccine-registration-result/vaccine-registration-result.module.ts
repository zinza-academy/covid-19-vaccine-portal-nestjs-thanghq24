import { Module } from '@nestjs/common';
import { VaccineRegistrationResultService } from './vaccine-registration-result.service';
import { VaccineRegistrationResultController } from './vaccine-registration-result.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VaccineRegistrationResult } from 'src/entities/vaccine-registration-result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VaccineRegistrationResult])],
  controllers: [VaccineRegistrationResultController],
  providers: [VaccineRegistrationResultService],
})
export class VaccineRegistrationResultModule {}
