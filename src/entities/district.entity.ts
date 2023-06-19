import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Province } from './province.entity';
import { Ward } from './ward.entity';

@Entity()
export class District {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  provinceId: number;

  @ManyToOne(() => Province, (province) => province.districts)
  province: Province;

  @OneToMany(() => Ward, (ward) => ward.district)
  wards: Ward[];
}
