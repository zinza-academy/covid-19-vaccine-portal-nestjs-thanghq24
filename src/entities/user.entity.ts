import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.entity';

export enum Gender {
  MALE = 'M',
  FEMALE = 'F',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', {
    length: 50,
  })
  fullName: string;

  @Column({ type: 'varchar', length: 320 })
  email: string;

  @Column({ type: 'varchar' })
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

  @Column()
  province: number;

  @Column()
  district: number;

  @Column()
  ward: number;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_role',
  })
  roles: Role[];
}
