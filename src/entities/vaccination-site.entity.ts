import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ward } from './ward.entity';
import { VaccineRegistrationResult } from './vaccine-registration-result.entity';

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

  @OneToMany(
    () => VaccineRegistrationResult,
    (vaccineRegistrationResult) => vaccineRegistrationResult.vaccinationSite,
  )
  vaccineRegistrationResults: VaccineRegistrationResult[];
}
