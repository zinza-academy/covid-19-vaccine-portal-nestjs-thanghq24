import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { District } from './district.entity';
import { Ward } from './ward.entity';

@Entity()
export class Province {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => District, (district) => district.province)
  districts: District[];

  @OneToMany(() => Ward, (ward) => ward.province)
  wards: Ward[];
}
