import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Gender } from 'src/entities/user.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(15, 15)
  healthInsuranceNumber: string;

  @MaxLength(10)
  @IsDateString()
  @IsNotEmpty()
  dob: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @IsNumber()
  @IsNotEmpty()
  @Min(100000000000)
  @Max(999999999999)
  citizenIdentification: number;

  @IsNumber()
  @IsNotEmpty()
  ward: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  roles: number[];
}
