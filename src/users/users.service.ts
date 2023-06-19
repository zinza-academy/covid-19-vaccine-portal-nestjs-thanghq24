import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });
    if (existingUser)
      throw new ConflictException('This email is already used!');

    const roleIds = await Promise.all(
      createUserDto.roles.map(async (roleId) => {
        if (await this.roleRepository.exist({ where: { id: roleId } }))
          return {
            id: roleId,
          };
        else throw new NotFoundException(`Role with id ${roleId} not found!`);
      }),
    );

    const createdUser = await this.userRepository.save({
      ...createUserDto,
      province: { id: createUserDto.province },
      roles: roleIds,
    });
    return createdUser;
  }

  findAll(page: number, pageSize: number) {
    const users = this.userRepository.find({
      take: pageSize,
      skip: pageSize * page,
      relations: { roles: true },
      loadRelationIds: true,
    });
    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: { roles: true },
      loadRelationIds: true,
    });
    if (!user) throw new NotFoundException('User not found!');
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
      relations: { roles: true },
      loadRelationIds: true,
    });
    if (!user) throw new NotFoundException(`User with given email not found!`);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const existingUser = await this.userRepository.findOneBy({
      email: updateUserDto.email,
    });
    if (existingUser)
      throw new ConflictException('This email is already used!');

    const updateUser = await this.findOne(id);
    if (!updateUser) throw new NotFoundException('User not found!');

    const roleIds = await Promise.all(
      updateUserDto.roles.map(async (roleId) => {
        if (await this.roleRepository.exist({ where: { id: roleId } }))
          return {
            id: roleId,
          };
        else throw new NotFoundException(`Role with id ${roleId} not found!`);
      }),
    );

    const toUpdateUser = {
      id: updateUser.id,
      ...updateUserDto,
      province: { id: updateUserDto.province },
      roles: roleIds,
    };
    const updatedUser = await this.userRepository.save(toUpdateUser);
    return updatedUser;
  }

  async remove(id: number) {
    const deleteUser = await this.findOne(id);
    if (!deleteUser) throw new NotFoundException('User not found!');
    this.userRepository.delete({ id: id });
  }
}
