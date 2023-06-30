import { IsEnum, IsNotEmpty } from 'class-validator';
import { STATUS } from 'src/entities/vaccine-registration.entity';

export class DecideRegistrationDto {
  @IsEnum(STATUS)
  @IsNotEmpty()
  status: STATUS;
}
