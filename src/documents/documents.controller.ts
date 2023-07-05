import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UnprocessableEntityException,
  ParseFilePipe,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  AllowedRoles,
  Roles,
} from 'src/auth/decorator/allowed-roles.decorator';
import { Public } from 'src/auth/decorator/public-route.decorator';
import { readFileSync } from 'fs';
import { join } from 'path';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @AllowedRoles(Roles.Admin)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createDocumentDto: CreateDocumentDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 4294967295 })],
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
  ) {
    const savedFile = readFileSync(join(process.cwd(), file.path), {
      encoding: 'binary',
    });
    if (savedFile.slice(0, 4) !== '%PDF')
      throw new UnprocessableEntityException();

    return this.documentsService.create(createDocumentDto, file);
  }

  @Public()
  @Get()
  findAll() {
    return this.documentsService.findAll();
  }

  @Public()
  @Get('download/:id')
  downloadOne(@Param('id') id: string) {
    return this.documentsService.downloadOneFile(+id);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentsService.findOne(+id);
  }

  @AllowedRoles(Roles.Admin)
  @UseInterceptors(FileInterceptor('file'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 4294967295 })],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log('controller: ', file);
    if (file) {
      const savedFile = readFileSync(join(process.cwd(), file.path), {
        encoding: 'binary',
      });
      if (savedFile.slice(0, 4) !== '%PDF')
        throw new UnprocessableEntityException();
    }

    return this.documentsService.update(+id, updateDocumentDto, file);
  }

  @AllowedRoles(Roles.Admin)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.documentsService.remove(+id);

    return { message: 'Document has been deleted!' };
  }
}
