import {
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Column,
  Entity,
} from 'typeorm';
import { File } from './file.entity';

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => File, (file) => file.document, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  file: File;
}
