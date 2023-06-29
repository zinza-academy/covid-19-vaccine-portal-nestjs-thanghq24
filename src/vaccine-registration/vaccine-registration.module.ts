import { Module } from '@nestjs/common';
import { VaccineRegistrationService } from './vaccine-registration.service';
import { VaccineRegistrationController } from './vaccine-registration.controller';

@Module({
  controllers: [VaccineRegistrationController],
  providers: [VaccineRegistrationService],
})
export class VaccineRegistrationModule {}
