import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ward } from 'src/entities/ward.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WardsService {
  constructor(
    @InjectRepository(Ward) private wardRepository: Repository<Ward>,
  ) {}

  findAll() {
    return this.wardRepository.find();
  }

  findOne(id: number) {
    return this.wardRepository.findOneBy({ id: id });
  }

  findByDistrict(districtId: number) {
    return this.wardRepository.findBy({ districtId: districtId });
  }
}
