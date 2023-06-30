import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { VaccineRegistrationResult } from './vaccine-registration-result.entity';

export enum STATUS {
  REQUESTED = 'REQUESTED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
}

@Entity()
export class VaccineRegistration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: STATUS, default: STATUS.REQUESTED })
  status: STATUS;

  @Column()
  priorityType: number;

  @Column()
  job: number;

  @Column()
  workplace: string;

  @Column()
  address: string;

  @Column({
    type: 'date',
  })
  appointmentDate: string;

  @Column()
  dayPhase: number;

  @ManyToOne(() => User, (user) => user.vaccineRegistrations)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @OneToOne(
    () => VaccineRegistrationResult,
    (vaccineRegistrationResult) =>
      vaccineRegistrationResult.vaccineRegistration,
  )
  vaccineRegistrationResult: VaccineRegistrationResult;
}
