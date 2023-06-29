import { Injectable } from '@nestjs/common';
import { CreateVaccineTypeDto } from './dto/create-vaccine-type.dto';
import { UpdateVaccineTypeDto } from './dto/update-vaccine-type.dto';

@Injectable()
export class VaccineTypeService {
  create(createVaccineTypeDto: CreateVaccineTypeDto) {
    return 'This action adds a new vaccineType';
  }

  findAll() {
    return `This action returns all vaccineType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vaccineType`;
  }

  update(id: number, updateVaccineTypeDto: UpdateVaccineTypeDto) {
    return `This action updates a #${id} vaccineType`;
  }

  remove(id: number) {
    return `This action removes a #${id} vaccineType`;
  }
}
