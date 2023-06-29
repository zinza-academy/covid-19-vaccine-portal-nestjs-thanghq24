import { Injectable } from '@nestjs/common';
import { CreateVaccineRegistrationResultDto } from './dto/create-vaccine-registration-result.dto';
import { UpdateVaccineRegistrationResultDto } from './dto/update-vaccine-registration-result.dto';

@Injectable()
export class VaccineRegistrationResultService {
  create(
    createVaccineRegistrationResultDto: CreateVaccineRegistrationResultDto,
  ) {
    return 'This action adds a new vaccineRegistrationResult';
  }

  findAll() {
    return `This action returns all vaccineRegistrationResult`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vaccineRegistrationResult`;
  }

  update(
    id: number,
    updateVaccineRegistrationResultDto: UpdateVaccineRegistrationResultDto,
  ) {
    return `This action updates a #${id} vaccineRegistrationResult`;
  }

  remove(id: number) {
    return `This action removes a #${id} vaccineRegistrationResult`;
  }
}
