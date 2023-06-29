import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ForbiddenException,
} from '@nestjs/common';
import { VaccineRegistrationService } from './vaccine-registration.service';
import { CreateVaccineRegistrationDto } from './dto/create-vaccine-registration.dto';
import { UpdateVaccineRegistrationDto } from './dto/update-vaccine-registration.dto';
import {
  AllowedRoles,
  ROLES,
} from 'src/auth/decorator/allowed-roles.decorator';
import { GetUserFromJwtPayload } from 'src/auth/decorator/get-user-payload.decorator';
import { User } from 'src/entities/user.entity';
import { FindVaccineRegistrationDto } from './dto/find-vaccine-registration.dto';

@Controller('vaccine-registration')
export class VaccineRegistrationController {
  constructor(
    private readonly vaccineRegistrationService: VaccineRegistrationService,
  ) {}

  @AllowedRoles(ROLES.ADMIN, ROLES.USER)
  @Post()
  create(
    @GetUserFromJwtPayload() user: User,
    @Body() createVaccineRegistrationDto: CreateVaccineRegistrationDto,
  ) {
    if (!user.isAdmin() && user.id !== createVaccineRegistrationDto.user)
      throw new ForbiddenException('You can only register for yourself!');

    return this.vaccineRegistrationService.create(createVaccineRegistrationDto);
  }

  @AllowedRoles(ROLES.ADMIN, ROLES.USER)
  @Get()
  findAll(
    @GetUserFromJwtPayload() user: User,
    @Query()
    findVaccineRegistrationDto: FindVaccineRegistrationDto,
  ) {
    if (!user.isAdmin() && user.id !== findVaccineRegistrationDto.userId)
      throw new ForbiddenException(
        'You can only look for your own vaccine registrations!',
      );

    return this.vaccineRegistrationService.findAll(
      findVaccineRegistrationDto.userId,
    );
  }

  @AllowedRoles(ROLES.ADMIN, ROLES.USER)
  @Get(':id')
  async findOne(@GetUserFromJwtPayload() user: User, @Param('id') id: string) {
    const vaccineRegistration = await this.vaccineRegistrationService.findOne(
      +id,
    );

    if (!user.isAdmin() && user.id !== vaccineRegistration.user.id)
      throw new ForbiddenException(
        'You can only look for your own vaccine registrations!',
      );

    return vaccineRegistration;
  }

  @AllowedRoles(ROLES.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVaccineRegistrationDto: UpdateVaccineRegistrationDto,
  ) {
    return this.vaccineRegistrationService.update(
      +id,
      updateVaccineRegistrationDto,
    );
  }

  @AllowedRoles(ROLES.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.vaccineRegistrationService.remove(+id);
    return { message: 'ok' };
  }
}
