import { VaccineRegistrationResultService } from './../vaccine-registration-result/vaccine-registration-result.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVaccineRegistrationDto } from './dto/create-vaccine-registration.dto';
import { UpdateVaccineRegistrationDto } from './dto/update-vaccine-registration.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  VaccineRegistrationStatus,
  VaccineRegistration,
} from 'src/entities/vaccine-registration.entity';
import { Repository } from 'typeorm';
import { FindVaccineRegistrationDto } from './dto/find-vaccine-registration.dto';

@Injectable()
export class VaccineRegistrationService {
  constructor(
    @InjectRepository(VaccineRegistration)
    private readonly vaccineRegistrationRepository: Repository<VaccineRegistration>,
    private readonly vaccineRegistrationResultService: VaccineRegistrationResultService,
  ) {}

  async create(createVaccineRegistrationDto: CreateVaccineRegistrationDto) {
    const createdVaccineRegistration =
      await this.vaccineRegistrationRepository.save({
        ...createVaccineRegistrationDto,
        user: { id: createVaccineRegistrationDto.user },
      });

    return this.findOne(createdVaccineRegistration.id);
  }

  findAll(findVaccineRegistrationDto: FindVaccineRegistrationDto) {
    const { page, pageSize, status, userId, appointmentDate, priorityType } =
      findVaccineRegistrationDto;
    return this.vaccineRegistrationRepository.findAndCount({
      take: pageSize,
      skip: page * pageSize,
      where: {
        user: { id: userId },
        status: status,
        priorityType: priorityType,
        appointmentDate: appointmentDate,
      },
      relations: {
        user: { roles: true, ward: { district: { province: true } } },
        vaccineRegistrationResult: {
          vaccinationSite: true,
          vaccineType: true,
        },
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
          user: { roles: true, ward: { district: { province: true } } },
          vaccineRegistrationResult: {
            vaccinationSite: true,
            vaccineType: true,
            vaccineRegistration: false,
          },
        },
      });

    if (!vaccineRegistration)
      throw new NotFoundException('No vaccine registration found!');

    return vaccineRegistration;
  }

  async decideRegistration(id: number, status: VaccineRegistrationStatus) {
    const registration = await this.findOne(id);

    await this.vaccineRegistrationRepository.update(id, { status: status });

    if (
      registration.vaccineRegistrationResult === null &&
      status === VaccineRegistrationStatus.Accepted
    ) {
      await this.vaccineRegistrationResultService.create({
        injectingTime: null,
        vaccinationSite: null,
        vaccineRegistration: id,
        vaccineType: null,
      });
    }

    return this.findOne(id);
  }

  async update(
    id: number,
    updateVaccineRegistrationDto: UpdateVaccineRegistrationDto,
  ) {
    await this.findOne(id);

    await this.vaccineRegistrationRepository.update(
      id,
      updateVaccineRegistrationDto,
    );

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.vaccineRegistrationRepository.delete(id);
  }
}
