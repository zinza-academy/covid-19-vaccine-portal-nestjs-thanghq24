import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Province } from 'src/entities/province.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProvincesService {
  constructor(
    @InjectRepository(Province)
    private provinceRepository: Repository<Province>,
  ) {}
  findAll() {
    return this.provinceRepository.find();
  }

  findOne(id: number) {
    return this.provinceRepository.findBy({ id: id });
  }
}
