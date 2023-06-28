import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { MailModule } from 'src/mail/mail.module';
import { RolesGuard } from './guard/roles.guard';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_EXPIRE_TIME },
      }),
    }),
    MailModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
