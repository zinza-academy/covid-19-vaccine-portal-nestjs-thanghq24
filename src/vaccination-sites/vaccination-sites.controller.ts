import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { VaccinationSitesService } from './vaccination-sites.service';
import { CreateVaccinationSiteDto } from './dto/create-vaccination-site.dto';
import { UpdateVaccinationSiteDto } from './dto/update-vaccination-site.dto';
import { Public } from 'src/auth/decorator/public-route.decorator';
import {
  AllowedRoles,
  Roles,
} from 'src/auth/decorator/allowed-roles.decorator';
import { PaginationInterceptor } from 'src/interceptor/pagination.interceptor';
import { FindVaccinationDto } from './dto/find-vaccination-site.dto';

@Controller('vaccination-sites')
export class VaccinationSitesController {
  constructor(
    private readonly vaccinationSitesService: VaccinationSitesService,
  ) {}

  @AllowedRoles(Roles.Admin)
  @Post()
  create(@Body() createVaccinationSiteDto: CreateVaccinationSiteDto) {
    return this.vaccinationSitesService.create(createVaccinationSiteDto);
  }

  @UseInterceptors(PaginationInterceptor)
  @Public()
  @Get()
  findAll(@Query() findQuery: FindVaccinationDto) {
    return this.vaccinationSitesService.findAll(findQuery);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vaccinationSitesService.findOne(+id);
  }

  @AllowedRoles(Roles.Admin)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVaccinationSiteDto: UpdateVaccinationSiteDto,
  ) {
    return this.vaccinationSitesService.update(+id, updateVaccinationSiteDto);
  }

  @AllowedRoles(Roles.Admin)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.vaccinationSitesService.remove(+id);
    return { message: 'ok' };
  }
}
