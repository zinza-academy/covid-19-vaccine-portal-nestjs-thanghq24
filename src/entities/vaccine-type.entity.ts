import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { VaccineRegistrationResult } from './vaccine_registration_result.entity';

@Entity()
export class VaccineType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  batchNumber: string;

  @OneToMany(
    () => VaccineRegistrationResult,
    (vaccineRegistration) => vaccineRegistration.vaccineType,
  )
  vaccineRegistrationResults: VaccineRegistrationResult[];
}
