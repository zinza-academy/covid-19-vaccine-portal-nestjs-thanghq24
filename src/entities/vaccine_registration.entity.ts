import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { VaccineRegistrationResult } from './vaccine_registration_result.entity';

export enum STATUS {
  REQUESTED = '0',
  ACCEPTED = '1',
  REJECTED = '2',
  COMPLETED = '3',
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

  @OneToOne(() => VaccineRegistrationResult)
  vaccineRegistrationResult: VaccineRegistrationResult;
}
