import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWTFromCookie,
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: {
    id: number;
    fullName: string;
    roles: { id: number }[];
  }) {
    const user = await this.userService.findOne(payload.id);
    if (!user) throw new UnauthorizedException();
    return user;
  }

  private static extractJWTFromCookie(req: Request): string | null {
    let accessToken = null;
    if (req.cookies && req.cookies['access_token']) {
      accessToken = req.cookies['access_token'];
    }
    return accessToken;
  }
}
