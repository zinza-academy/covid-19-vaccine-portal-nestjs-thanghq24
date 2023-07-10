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
  StreamableFile,
  Res,
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
import { Response } from 'express';
import { multerOptions } from './storageOptions';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @AllowedRoles(Roles.Admin)
  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  create(
    @Body() createDocumentDto: CreateDocumentDto,
    @UploadedFile(
      new ParseFilePipe({
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
  async downloadOne(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const downloadFile = await this.documentsService.downloadOneFile(+id);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${downloadFile.fileName}.pdf"`,
    });

    return new StreamableFile(downloadFile.file);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentsService.findOne(+id);
  }

  @AllowedRoles(Roles.Admin)
  @UseInterceptors(FileInterceptor('file', multerOptions))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
  ) {
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
