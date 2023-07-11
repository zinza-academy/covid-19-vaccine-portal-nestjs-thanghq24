import { Controller, Post } from '@nestjs/common';
import { SeedingService } from './seeding.service';
import { Public } from 'src/auth/decorator/public-route.decorator';

@Controller('seeding')
export class SeedingController {
  constructor(private readonly seedingService: SeedingService) {}

  @Public()
  @Post('roles')
  seedRoles() {
    return this.seedingService.seedRoles();
  }

  @Public()
  @Post('users')
  seedUsers() {
    return this.seedingService.seedUsers();
  }
}
