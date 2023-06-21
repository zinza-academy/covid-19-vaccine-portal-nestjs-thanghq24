import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { District } from 'src/entities/district.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DistrictsService {
  constructor(
    @InjectRepository(District)
    private districtRepository: Repository<District>,
  ) {}

  findAll() {
    return this.districtRepository.find();
  }

  findOne(id: number) {
    return this.districtRepository.findBy({ id: id });
  }

  findByProvince(provinceId: number) {
    return this.districtRepository.findBy({ provinceId: provinceId });
  }
}
