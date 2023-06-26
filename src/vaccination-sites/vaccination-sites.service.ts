import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVaccinationSiteDto } from './dto/create-vaccination-site.dto';
import { UpdateVaccinationSiteDto } from './dto/update-vaccination-site.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VaccinationSite } from 'src/entities/vaccination-site.entity';
import { Like, Repository } from 'typeorm';
import { FindVaccinationDto } from './dto/find-vaccination-site.dto';

@Injectable()
export class VaccinationSitesService {
  constructor(
    @InjectRepository(VaccinationSite)
    private vaccinationSiteRepository: Repository<VaccinationSite>,
  ) {}

  async create(createVaccinationSiteDto: CreateVaccinationSiteDto) {
    const vaccinationSite = this.vaccinationSiteRepository.create({
      ...createVaccinationSiteDto,
      ward: { id: createVaccinationSiteDto.ward },
    });

    const createdVaccinationSite = await this.vaccinationSiteRepository.save(
      vaccinationSite,
    );

    return this.findOne(createdVaccinationSite.id);
  }

  findAll(findQuery: FindVaccinationDto) {
    const { page, pageSize, ward, district, province, name, address } =
      findQuery;

    return this.vaccinationSiteRepository.findAndCount({
      take: pageSize,
      skip: page * pageSize,
      relations: {
        ward: {
          district: {
            province: true,
          },
        },
      },
      where: {
        name: name ? Like(`%${name}%`) : null,
        address: address ? Like(`%${address}%`) : null,
        ward: {
          id: ward ? ward : null,
          district: {
            id: district ? district : null,
            provinceId: province ? province : null,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const vaccinationSite = await this.vaccinationSiteRepository.findOne({
      where: { id: id },
      relations: {
        ward: {
          district: {
            province: true,
          },
        },
      },
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

    await this.vaccinationSiteRepository.save(toUpdateVaccinationSite);

    return this.findOne(id);
  }

  async remove(id: number) {
    const vaccinationSite = await this.findOne(id);
    if (!vaccinationSite)
      throw new NotFoundException('Vaccination site not found!');
    this.vaccinationSiteRepository.delete(id);
  }
}
