import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  UseInterceptors,
} from '@nestjs/common';
import { VaccinationSitesService } from './vaccination-sites.service';
import { CreateVaccinationSiteDto } from './dto/create-vaccination-site.dto';
import { UpdateVaccinationSiteDto } from './dto/update-vaccination-site.dto';
import { Public } from 'src/auth/decorator/public-route.decorator';
import {
  AllowedRoles,
  ROLES,
} from 'src/auth/decorator/allowed-roles.decorator';
import { PaginationInterceptor } from 'src/intercepter/pagination.intercepter';

@Controller('vaccination-sites')
export class VaccinationSitesController {
  constructor(
    private readonly vaccinationSitesService: VaccinationSitesService,
  ) {}

  @AllowedRoles(ROLES.ADMIN)
  @Post()
  create(@Body() createVaccinationSiteDto: CreateVaccinationSiteDto) {
    return this.vaccinationSitesService.create(createVaccinationSiteDto);
  }

  @UseInterceptors(PaginationInterceptor)
  @Public()
  @Get()
  findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
    @Query('ward', new DefaultValuePipe(null))
    ward: number,
    @Query('district', new DefaultValuePipe(null))
    district: number,
    @Query('province', new DefaultValuePipe(null))
    province: number,
    @Query('name', new DefaultValuePipe(null)) name: string,
    @Query('address', new DefaultValuePipe(null)) address: string,
  ) {
    return this.vaccinationSitesService.findAll(
      page,
      pageSize,
      ward,
      district,
      province,
      name,
      address,
    );
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vaccinationSitesService.findOne(+id);
  }

  @AllowedRoles(ROLES.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVaccinationSiteDto: UpdateVaccinationSiteDto,
  ) {
    return this.vaccinationSitesService.update(+id, updateVaccinationSiteDto);
  }

  @AllowedRoles(ROLES.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.vaccinationSitesService.remove(+id);
    return { message: 'ok' };
  }
}
