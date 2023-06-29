import { Module } from '@nestjs/common';
import { VaccineRegistrationService } from './vaccine-registration.service';
import { VaccineRegistrationController } from './vaccine-registration.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VaccineRegistration } from 'src/entities/vaccine-registration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VaccineRegistration])],
  controllers: [VaccineRegistrationController],
  providers: [VaccineRegistrationService],
})
export class VaccineRegistrationModule {}
