import { Injectable } from '@nestjs/common';
import { CreateWardDto } from './dto/create-ward.dto';
import { UpdateWardDto } from './dto/update-ward.dto';

@Injectable()
export class WardService {
  create(createWardDto: CreateWardDto) {
    return 'This action adds a new ward';
  }

  findAll() {
    return `This action returns all ward`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ward`;
  }

  update(id: number, updateWardDto: UpdateWardDto) {
    return `This action updates a #${id} ward`;
  }

  remove(id: number) {
    return `This action removes a #${id} ward`;
  }
}
