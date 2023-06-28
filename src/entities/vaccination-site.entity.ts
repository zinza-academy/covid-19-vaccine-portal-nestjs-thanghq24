import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ward } from './ward.entity';

@Entity()
export class VaccinationSite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  address: string;

  @ManyToOne(() => Ward, (ward) => ward.users)
  @JoinColumn([{ name: 'ward_id', referencedColumnName: 'id' }])
  ward: Ward;

  @Column('varchar')
  manager: string;

  @Column('int')
  tableNumber: number;
}
