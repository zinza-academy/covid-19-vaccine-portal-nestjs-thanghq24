import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVaccineRegistrationResultDto } from './dto/create-vaccine-registration-result.dto';
import { UpdateVaccineRegistrationResultDto } from './dto/update-vaccine-registration-result.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VaccineRegistrationResult } from 'src/entities/vaccine-registration-result.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VaccineRegistrationResultService {
  constructor(
    @InjectRepository(VaccineRegistrationResult)
    private readonly vaccineRegistrationResult: Repository<VaccineRegistrationResult>,
  ) {}

  create(
    createVaccineRegistrationResultDto: CreateVaccineRegistrationResultDto,
  ) {
    return this.vaccineRegistrationResult.save({
      injectingTime: createVaccineRegistrationResultDto.injectingTime,
      vaccinationSite: {
        id: createVaccineRegistrationResultDto.vaccinationSite,
      },
      vaccineRegistration: {
        id: createVaccineRegistrationResultDto.vaccineRegistration,
      },
      vaccineType: {
        id: createVaccineRegistrationResultDto.vaccineType,
      },
    });
  }

  findAll() {
    return this.vaccineRegistrationResult.find({
      relations: {
        vaccinationSite: true,
        vaccineRegistration: true,
        vaccineType: true,
      },
    });
  }

  async findOne(id: number) {
    const vaccineRegistrationResult =
      await this.vaccineRegistrationResult.findOne({
        where: {
          id: id,
        },
        relations: {
          vaccinationSite: true,
          vaccineRegistration: true,
          vaccineType: true,
        },
      });

    if (!vaccineRegistrationResult)
      throw new NotFoundException('No vaccine registration result found!');

    return vaccineRegistrationResult;
  }

  async update(
    id: number,
    updateVaccineRegistrationResultDto: UpdateVaccineRegistrationResultDto,
  ) {
    const updateVaccineRegistrationResult = await this.findOne(id);

    const updatedVaccineRegistration =
      await this.vaccineRegistrationResult.save({
        id: updateVaccineRegistrationResult.id,
        injectingTime: updateVaccineRegistrationResultDto.injectingTime,
        vaccinationSite: {
          id: updateVaccineRegistrationResultDto.vaccinationSite,
        },
        vaccineType: {
          id: updateVaccineRegistrationResultDto.vaccineType,
        },
      });

    return this.findOne(updatedVaccineRegistration.id);
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.vaccineRegistrationResult.delete(id);
  }
}
