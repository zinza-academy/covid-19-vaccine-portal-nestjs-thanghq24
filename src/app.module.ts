import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { DatabaseModule } from './dataSource/database.module';
import { AuthModule } from './auth/auth.module';
import { ProvincesModule } from './provinces/provinces.module';
import { DistrictsModule } from './districts/districts.module';
import { WardsModule } from './wards/wards.module';
import { MailModule } from './mail/mail.module';
import { VaccinationSitesModule } from './vaccination-sites/vaccination-sites.module';
import { CaslModule } from './casl/casl.module';
import { VaccineRegistrationResultModule } from './vaccine-registration-result/vaccine-registration-result.module';
import { VaccineRegistrationModule } from './vaccine-registration/vaccine-registration.module';
import { VaccineTypeModule } from './vaccine-type/vaccine-type.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    RolesModule,
    AuthModule,
    ProvincesModule,
    DistrictsModule,
    WardsModule,
    MailModule,
    VaccinationSitesModule,
    CaslModule,
    VaccineTypeModule,
    VaccineRegistrationModule,
    VaccineRegistrationResultModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
