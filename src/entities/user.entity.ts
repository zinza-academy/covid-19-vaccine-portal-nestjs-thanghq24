import * as bcrypt from 'bcryptjs';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { Ward } from './ward.entity';
import { Exclude, instanceToPlain } from 'class-transformer';
import { VaccineRegistration } from './vaccine_registration.entity';

export enum Gender {
  MALE = 'M',
  FEMALE = 'F',
}

@Entity()
export class User {
  static salt = process.env.SALT_ROUND;

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', {
    length: 50,
  })
  fullName: string;

  @Column({ type: 'varchar', length: 320 })
  email: string;

  @Column({ type: 'varchar' })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ type: 'varchar', length: 15 })
  healthInsuranceNumber: string;

  @Column({
    type: 'date',
  })
  dob: string;

  @Column({
    type: 'enum',
    enum: Gender,
  })
  gender: string;

  @Column('bigint')
  citizenIdentification: number;

  @ManyToOne(() => Ward, (ward) => ward.users)
  @JoinColumn([{ name: 'ward_id', referencedColumnName: 'id' }])
  ward: Ward;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_role',
  })
  roles: Role[];

  @OneToMany(
    () => VaccineRegistration,
    (vaccineRegistration) => vaccineRegistration.user,
  )
  vaccineRegistrations: VaccineRegistration[];

  toJSON() {
    return instanceToPlain(this);
  }

  validatePassword(password: string) {
    return bcrypt.compare(password, this.password);
  }
}
