import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from 'src/entities/file.entity';
import { Document } from 'src/entities/document.entity';
import { Repository } from 'typeorm';
import { createReadStream, unlinkSync } from 'fs';
import { join } from 'path';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
  ) {}

  async create(
    createDocumentDto: CreateDocumentDto,
    file: Express.Multer.File,
  ) {
    const newFile = await this.fileRepository.create({
      path: file.path,
    });

    const savedFile = await this.fileRepository.save(newFile);

    const newDocument = await this.documentRepository.create({
      name: createDocumentDto.name,
      file: {
        id: savedFile.id,
      },
    });
    const savedDocument = await this.documentRepository.save(newDocument);

    return this.findOne(savedDocument.id);
  }

  findAll() {
    return this.documentRepository.find();
  }

  async findOne(id: number) {
    const document = await this.documentRepository.findOne({
      where: { id: id },
    });

    if (!document) throw new NotFoundException('No document found!');

    return document;
  }

  async downloadOneFile(documentId: number) {
    const document = await this.findOne(documentId);

    const file = createReadStream(join(process.cwd(), document.file.path));
    if (!file) throw new NotFoundException('No file found on the storage!');

    return new StreamableFile(file);
  }

  async update(
    id: number,
    updateDocumentDto: UpdateDocumentDto,
    file: Express.Multer.File,
  ) {
    const existingDocument = await this.findOne(id);

    console.log(file);

    if (file) {
      unlinkSync(join(process.cwd(), existingDocument.file.path));
      await this.fileRepository.delete(existingDocument.file.id);

      const newFile = await this.fileRepository.create({
        path: file.path,
      });
      const savedFile = await this.fileRepository.save(newFile);
      existingDocument.file = savedFile;
    }

    existingDocument.name = updateDocumentDto.name;

    const updatedDocument = await this.documentRepository.save(
      existingDocument,
    );

    return updatedDocument;
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.documentRepository.delete(id);
  }
}
