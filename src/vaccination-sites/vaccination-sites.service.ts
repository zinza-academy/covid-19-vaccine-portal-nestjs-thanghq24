import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVaccinationSiteDto } from './dto/create-vaccination-site.dto';
import { UpdateVaccinationSiteDto } from './dto/update-vaccination-site.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VaccinationSite } from 'src/entities/vaccination-site.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VaccinationSitesService {
  constructor(
    @InjectRepository(VaccinationSite)
    private vaccinationSiteRepository: Repository<VaccinationSite>,
  ) {}

  create(createVaccinationSiteDto: CreateVaccinationSiteDto) {
    const vaccinationSite = this.vaccinationSiteRepository.create({
      ...createVaccinationSiteDto,
      ward: { id: createVaccinationSiteDto.ward },
    });

    return this.vaccinationSiteRepository.save(vaccinationSite);
  }

  findAll(page: number, pageSize: number) {
    return this.vaccinationSiteRepository.findAndCount({
      take: pageSize,
      skip: page * pageSize,
    });
  }

  async findOne(id: number) {
    const vaccinationSite = await this.vaccinationSiteRepository.find({
      where: { id: id },
    });

    if (!vaccinationSite)
      throw new NotFoundException('Vaccination site not found!');

    return vaccinationSite;
  }

  async update(id: number, updateVaccinationSiteDto: UpdateVaccinationSiteDto) {
    const vaccinationSite = await this.findOne(id);
    if (!vaccinationSite)
      throw new NotFoundException('Vaccination site not found!');

    const toUpdateVaccinationSite = this.vaccinationSiteRepository.create({
      id: id,
      ...updateVaccinationSiteDto,
      ward: { id: updateVaccinationSiteDto.ward },
    });

    return this.vaccinationSiteRepository.save(toUpdateVaccinationSite);
  }

  async remove(id: number) {
    const vaccinationSite = await this.findOne(id);
    if (!vaccinationSite)
      throw new NotFoundException('Vaccination site not found!');
    this.vaccinationSiteRepository.delete(id);
  }
}
