import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { District } from './district.entity';

@Entity()
export class Ward {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => District, (district) => district.wards)
  district: District;
}
