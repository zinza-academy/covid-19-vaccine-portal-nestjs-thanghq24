import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { District } from './district.entity';

@Entity()
export class Province {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => District, (district) => district.province)
  districts: District[];
}
