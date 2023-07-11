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
      ward: { id: createUserDto.ward },
      roles: roleIds,
    });
    return createdUser;
  }

  findAll(page: number, pageSize: number) {
    const users = this.userRepository.find({
      take: pageSize,
      skip: pageSize * page,
      relations: { roles: true, ward: { district: { province: true } } },
    });
    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: { roles: true, ward: { district: { province: true } } },
    });
    if (!user) throw new NotFoundException('User not found!');
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
      relations: { roles: true, ward: { district: { province: true } } },
    });

    if (!user) throw new NotFoundException(`User with given email not found!`);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const existingUser = await this.userRepository.findOneBy({
      email: updateUserDto.email,
    });

    const updateUser = await this.findOne(id);

    if (
      existingUser.email === updateUserDto.email &&
      updateUser.email !== updateUserDto.email
    )
      throw new ConflictException('This email is already used!');

    const toUpdateUser = {
      ...updateUserDto,
      ward: { id: updateUserDto.ward },
    };

    await this.userRepository.update(id, toUpdateUser);

    return this.findOne(id);
  }

  async updatePassword(id: number, newPassword: string) {
    const updateUser = await this.findOne(id);
    if (!updateUser) throw new NotFoundException('User not found!');

    updateUser.password = newPassword;

    await this.userRepository.save(updateUser);

    return this.findOne(id);
  }

  async remove(id: number) {
    const deleteUser = await this.findOne(id);
    if (!deleteUser) throw new NotFoundException('User not found!');

    await this.userRepository.delete({ id: id });
  }
}
