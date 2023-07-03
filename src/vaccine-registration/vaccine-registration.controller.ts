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
  UseInterceptors,
} from '@nestjs/common';
import { VaccineRegistrationService } from './vaccine-registration.service';
import { CreateVaccineRegistrationDto } from './dto/create-vaccine-registration.dto';
import { UpdateVaccineRegistrationDto } from './dto/update-vaccine-registration.dto';
import {
  AllowedRoles,
  Roles,
} from 'src/auth/decorator/allowed-roles.decorator';
import { GetUserFromJwtPayload } from 'src/auth/decorator/get-user-payload.decorator';
import { User } from 'src/entities/user.entity';
import { FindVaccineRegistrationDto } from './dto/find-vaccine-registration.dto';
import { DecideRegistrationDto } from './dto/decide-registration-dto';
import { PaginationInterceptor } from 'src/interceptor/pagination.interceptor';

@Controller('vaccine-registrations')
export class VaccineRegistrationController {
  constructor(
    private readonly vaccineRegistrationService: VaccineRegistrationService,
  ) {}

  @AllowedRoles(Roles.Admin, Roles.User)
  @Post()
  create(
    @GetUserFromJwtPayload() user: User,
    @Body() createVaccineRegistrationDto: CreateVaccineRegistrationDto,
  ) {
    if (!user.isAdmin() && user.id !== createVaccineRegistrationDto.user)
      throw new ForbiddenException('You can only register for yourself!');

    return this.vaccineRegistrationService.create(createVaccineRegistrationDto);
  }

  @UseInterceptors(PaginationInterceptor)
  @AllowedRoles(Roles.Admin, Roles.User)
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

    return this.vaccineRegistrationService.findAll(findVaccineRegistrationDto);
  }

  @AllowedRoles(Roles.Admin, Roles.User)
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

  @AllowedRoles(Roles.Admin)
  @Patch('decide-registration/:id')
  decideRegistration(
    @Param('id') id: number,
    @Body() decideRegistrationDto: DecideRegistrationDto,
  ) {
    return this.vaccineRegistrationService.decideRegistration(
      id,
      decideRegistrationDto.status,
    );
  }

  @AllowedRoles(Roles.Admin)
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

  @AllowedRoles(Roles.Admin)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.vaccineRegistrationService.remove(+id);
    return { message: 'ok' };
  }
}
