import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVaccineRegistrationDto } from './dto/create-vaccine-registration.dto';
import { UpdateVaccineRegistrationDto } from './dto/update-vaccine-registration.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VaccineRegistration } from 'src/entities/vaccine-registration.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VaccineRegistrationService {
  constructor(
    @InjectRepository(VaccineRegistration)
    private readonly vaccineRegistrationRepository: Repository<VaccineRegistration>,
  ) {}

  create(createVaccineRegistrationDto: CreateVaccineRegistrationDto) {
    return this.vaccineRegistrationRepository.save({
      ...createVaccineRegistrationDto,
      user: { id: createVaccineRegistrationDto.user },
    });
  }

  findAll(userId: number) {
    return this.vaccineRegistrationRepository.find({
      where: {
        user: { id: userId },
      },
      relations: {
        user: true,
        vaccineRegistrationResult: true,
      },
    });
  }

  async findOne(id: number) {
    const vaccineRegistration =
      await this.vaccineRegistrationRepository.findOne({
        where: {
          id: id,
        },
        relations: {
          user: true,
          vaccineRegistrationResult: true,
        },
      });

    if (!vaccineRegistration)
      throw new NotFoundException('No vaccine registration found!');

    return vaccineRegistration;
  }

  async update(
    id: number,
    updateVaccineRegistrationDto: UpdateVaccineRegistrationDto,
  ) {
    const updateVaccineRegistration = await this.findOne(id);

    return this.vaccineRegistrationRepository.save({
      ...updateVaccineRegistration,
      ...updateVaccineRegistrationDto,
      user: {
        id: updateVaccineRegistration.id,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.vaccineRegistrationRepository.delete(id);
  }
}
