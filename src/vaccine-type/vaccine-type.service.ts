import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVaccineTypeDto } from './dto/create-vaccine-type.dto';
import { UpdateVaccineTypeDto } from './dto/update-vaccine-type.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { VaccineType } from 'src/entities/vaccine-type.entity';

@Injectable()
export class VaccineTypeService {
  constructor(
    @InjectRepository(VaccineType)
    private readonly vaccineTypeRepository: Repository<VaccineType>,
  ) {}

  create(createVaccineTypeDto: CreateVaccineTypeDto) {
    return this.vaccineTypeRepository.save(createVaccineTypeDto);
  }

  findAll() {
    return this.vaccineTypeRepository.find();
  }

  async findOne(id: number) {
    const vaccineType = await this.vaccineTypeRepository.findOneBy({ id: id });

    if (!vaccineType) throw new NotFoundException('No vaccine type found!');

    return vaccineType;
  }

  async update(id: number, updateVaccineTypeDto: UpdateVaccineTypeDto) {
    const updateVaccineType = await this.findOne(id);

    return this.vaccineTypeRepository.save({
      ...updateVaccineType,
      ...updateVaccineTypeDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.vaccineTypeRepository.delete(id);
  }
}
