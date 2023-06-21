import * as bcrypt from 'bcryptjs';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { Province } from './province.entity';
import { District } from './district.entity';
import { Ward } from './ward.entity';
import { Exclude, instanceToPlain } from 'class-transformer';

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

  @ManyToOne(() => Province)
  @JoinColumn([{ name: 'province_id', referencedColumnName: 'id' }])
  province: Province;

  @ManyToOne(() => District)
  @JoinColumn([{ name: 'district_id', referencedColumnName: 'id' }])
  district: number;

  @ManyToOne(() => Ward)
  @JoinColumn([{ name: 'ward_id', referencedColumnName: 'id' }])
  ward: number;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_role',
  })
  roles: Role[];

  toJSON() {
    return instanceToPlain(this);
  }

  validatePassword(password: string) {
    // if (!!this.password || !!User.salt) return false;
    return bcrypt.compare(password, this.password);
  }
}
