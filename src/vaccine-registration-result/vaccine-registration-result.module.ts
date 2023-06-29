import { Module } from '@nestjs/common';
import { VaccineRegistrationResultService } from './vaccine-registration-result.service';
import { VaccineRegistrationResultController } from './vaccine-registration-result.controller';

@Module({
  controllers: [VaccineRegistrationResultController],
  providers: [VaccineRegistrationResultService],
})
export class VaccineRegistrationResultModule {}
