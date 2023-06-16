import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Province } from './province.entity';
import { Ward } from './ward.entity';

@Entity()
export class District {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Province, (province) => province.districts)
  province: Province;

  @OneToMany(() => Ward, (ward) => ward.district)
  wards: Ward[];
}
