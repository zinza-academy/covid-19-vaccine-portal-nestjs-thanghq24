import * as bcrypt from 'bcryptjs';
import { UsersService } from './../users/users.service';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signUp.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { MailService } from 'src/mail/mail.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { decode } from 'punycode';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
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
    const hashPassword = await AuthService.generateHashPassword(
      signUpDto.password,
    );

    return this.usersService.create({
      ...signUpDto,
      password: hashPassword,
    });
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.usersService.findByEmail(forgotPasswordDto.email);
    if (!user) throw new NotFoundException();

    const payload = { id: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    await this.mailService.sendForgotPasswordEmail(user.email, token);

    return token;
  }

  async changePassword(changePasswordDto: ChangePasswordDto, token: string) {
    const validToken = await this.jwtService.verifyAsync(token);
    if (!validToken)
      throw new UnauthorizedException(
        'Reset password token invalid or expired!',
      );

    const decodedToken = this.jwtService.decode(token);
    const userId = decodedToken['id'];

    const user = await this.usersService.findOne(userId);
    if (!user) throw new NotFoundException();
    const newHashPassword = await AuthService.generateHashPassword(
      changePasswordDto.password,
    );

    await this.usersService.updatePassword(userId, newHashPassword);
  }

  private static async generateHashPassword(password: string) {
    const saltRound = +process.env.SALT_ROUND;
    const genSalt = await bcrypt.genSalt(saltRound);
    const hashPassword = await bcrypt.hash(password, genSalt);

    return hashPassword;
  }
}
