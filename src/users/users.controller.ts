import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  AllowedRoles,
  Roles,
} from 'src/auth/decorator/allowed-roles.decorator';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Action } from 'src/casl/Action';
import { User } from 'src/entities/user.entity';
import { GetUserFromJwtPayload } from 'src/auth/decorator/get-user-payload.decorator';

@Controller('users')
export class UsersController {
  constructor(
    private caslAbilityFactory: CaslAbilityFactory,
    private readonly usersService: UsersService,
  ) {}

  @AllowedRoles(Roles.Admin)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const createdUser = await this.usersService.create(createUserDto);
    return createdUser;
  }

  @AllowedRoles(Roles.Admin)
  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
  ) {
    const users = await this.usersService.findAll(page, pageSize);
    return users;
  }

  @AllowedRoles(Roles.Admin, Roles.User)
  @Get(':id')
  async findOne(
    @GetUserFromJwtPayload('user') user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const foundUser = await this.usersService.findOne(id);
    const ability = this.caslAbilityFactory.createForUser(user);

    if (!ability.can(Action.Read, foundUser)) {
      throw new ForbiddenException('You cannot see other account details!');
    }

    return foundUser;
  }

  @AllowedRoles(Roles.Admin, Roles.User)
  @Patch(':id')
  async update(
    @GetUserFromJwtPayload('user') user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const existingUser = await this.usersService.findOne(id);
    const ability = this.caslAbilityFactory.createForUser(user);

    if (!ability.can(Action.Read, existingUser)) {
      throw new ForbiddenException('You cannot modify other account details!');
    }

    const updatedUser = await this.usersService.update(id, updateUserDto);

    return updatedUser;
  }

  @AllowedRoles(Roles.Admin)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.remove(id);
    return { message: `User with id ${id} has been deleted` };
  }
}
