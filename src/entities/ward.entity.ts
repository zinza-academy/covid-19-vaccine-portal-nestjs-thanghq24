import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { District } from './district.entity';

@Entity()
export class Ward {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  districtId: number;

  @ManyToOne(() => District, (district) => district.wards)
  district: District;
}
