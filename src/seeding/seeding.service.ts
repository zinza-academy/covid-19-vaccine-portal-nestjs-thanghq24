import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedingService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async seedRoles() {
    const roleSeed = [
      {
        id: 1,
        name: 'super',
      },
      {
        id: 2,
        name: 'admin',
      },
      {
        id: 3,
        name: 'user',
      },
    ];
    await this.roleRepository.save(roleSeed);
  }

  async seedUsers() {
    const adminUser = {
      fullName: 'Quoc Thang Ha',
      roles: [
        {
          id: 2,
        },
      ],
      email: 'thang.hq@zinza.com.vn',
      password: '2a$10$ihd3u9PFhX6jAlR5EHSV9OHuCfiT/PUsWlnQ/jlB65wYfiKLVpVE6',
      healthInsuranceNumber: 'HD4429830333838',
      dob: '1996-06-12',
      gender: 'M',
      citizenIdentification: 273748574774,
      ward: {
        id: 1,
      },
    };
    await this.userRepository.save(adminUser);
  }
}
