import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VaccineType } from './vaccine-type.entity';
import { VaccinationSite } from './vaccination-site.entity';
import { VaccineRegistration } from './vaccine-registration.entity';

@Entity()
export class VaccineRegistrationResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'date',
  })
  injectingTime: string;

  @ManyToOne(
    () => VaccineType,
    (vaccineType) => vaccineType.vaccineRegistrationResults,
  )
  @JoinColumn([{ name: 'vaccine_type_id', referencedColumnName: 'id' }])
  vaccineType: VaccineType;

  @ManyToOne(
    () => VaccinationSite,
    (vaccinationSite) => vaccinationSite.vaccineRegistrationResults,
  )
  @JoinColumn([{ name: 'vaccination_site_id', referencedColumnName: 'id' }])
  vaccinationSite: VaccinationSite;

  @OneToOne(
    () => VaccineRegistration,
    (vaccineRegistration) => vaccineRegistration.vaccineRegistrationResult,
  )
  @JoinColumn()
  vaccineRegistration: VaccineRegistration;
}
