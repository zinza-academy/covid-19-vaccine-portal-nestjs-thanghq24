import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { District } from './district.entity';
import { User } from './user.entity';

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

  @OneToMany(() => User, (user) => user.ward)
  users: User[];
}
