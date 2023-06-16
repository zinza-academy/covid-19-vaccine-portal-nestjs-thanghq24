import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { District } from './district.entity';
import { Province } from './province.entity';

@Entity()
export class Ward {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => District, (district) => district.wards)
  district: District;

  @ManyToOne(() => Province, (province) => province.wards)
  province: Province;
}
