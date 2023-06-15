import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Repository } from 'typeorm';
import { Role } from 'src/entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const existingRole = await this.roleRepository.findOne({
      where: { name: createRoleDto.name },
    });
    if (existingRole)
      throw new ConflictException('This role is already created!');
    const createRole = await this.roleRepository.create(createRoleDto);
    const createdRole = await this.roleRepository.save(createRole);
    return createdRole;
  }

  async findAll() {
    const roles = await this.roleRepository.find();
    return roles;
  }

  async findOne(id: number) {
    const role = await this.roleRepository.findOne({ where: { id: id } });
    if (!role) throw new NotFoundException('Role not found!');
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const existingRole = await this.roleRepository.findOne({
      where: { name: updateRoleDto.name },
    });
    if (existingRole)
      throw new ConflictException('This role is already created!');
    const updateRole = await this.findOne(id);
    if (!updateRole) throw new NotFoundException('Role not found!');
    updateRole.name = updateRoleDto.name;
    const updatedRole = await this.roleRepository.save(updateRole);
    return updatedRole;
  }

  async remove(id: number) {
    const deleteRole = await this.findOne(id);
    if (!deleteRole) throw new NotFoundException('Role not found!');
    this.roleRepository.delete({ id: id });
  }
}
