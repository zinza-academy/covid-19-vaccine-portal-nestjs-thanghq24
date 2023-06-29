import { Injectable } from '@nestjs/common';
import { CreateVaccineRegistrationDto } from './dto/create-vaccine-registration.dto';
import { UpdateVaccineRegistrationDto } from './dto/update-vaccine-registration.dto';

@Injectable()
export class VaccineRegistrationService {
  create(createVaccineRegistrationDto: CreateVaccineRegistrationDto) {
    return 'This action adds a new vaccineRegistration';
  }

  findAll() {
    return `This action returns all vaccineRegistration`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vaccineRegistration`;
  }

  update(
    id: number,
    updateVaccineRegistrationDto: UpdateVaccineRegistrationDto,
  ) {
    return `This action updates a #${id} vaccineRegistration`;
  }

  remove(id: number) {
    return `This action removes a #${id} vaccineRegistration`;
  }
}
