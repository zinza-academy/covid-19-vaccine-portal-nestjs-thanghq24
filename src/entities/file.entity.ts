import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Document } from './document.entity';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  originalName: string;

  @Column()
  fileName: string;

  @Column()
  path: string;

  @OneToOne(() => Document, (document) => document.file, {
    onDelete: 'CASCADE',
  })
  document: Document;
}
