import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Document } from './document.entity';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @OneToOne(() => Document, (document) => document.file, {
    onDelete: 'CASCADE',
  })
  document: Document;
}
