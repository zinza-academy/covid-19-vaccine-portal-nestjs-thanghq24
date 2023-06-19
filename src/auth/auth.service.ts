import * as bcrypt from 'bcryptjs';
import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signUp.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDTO) {
    const user = await this.usersService.findByEmail(loginDto.email);

    const correctPassword = await user.validatePassword(loginDto.password);
    if (!correctPassword) throw new UnauthorizedException();

    const payload = { id: user.id, fullName: user.fullName, roles: user.roles };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken: accessToken, user: user.toJSON() };
  }

  async signUp(signUpDto: SignUpDto) {
    const saltRound = +process.env.SALT_ROUND;
    const genSalt = await bcrypt.genSalt(saltRound);
    const hashPassword = await bcrypt.hash(signUpDto.password, genSalt);

    return this.usersService.create({
      ...signUpDto,
      password: hashPassword,
    });
  }
}
