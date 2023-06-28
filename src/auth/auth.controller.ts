import { LoginDTO } from './dto/login.dto';
import { Body, Controller, Param, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { Public } from './decorator/public-route.decorator';
import { Response } from 'express';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(
    @Body() loginDto: LoginDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const loginResult = await this.authService.login(loginDto);

    res.cookie('access_token', loginResult.accessToken, {
      maxAge: 60 * 30 * 1000,
      // httpOnly: true,
      secure: true,
    });

    return loginResult;
  }

  @Public()
  @Post('logout')
  async logOut(@Res({ passthrough: true }) res: Response) {
    res.cookie('access_token', '', {
      maxAge: 0,
    });
    return { message: 'ok' };
  }

  @Public()
  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    signUpDto.roles = [3];
    await this.authService.signUp(signUpDto);
    return { message: 'ok' };
  }

  @Public()
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    const token = await this.authService.forgotPassword(forgotPasswordDto);
    return { token: token };
  }

  @Public()
  @Post('change-password/:token')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Param('token') token: string,
  ) {
    await this.authService.changePassword(changePasswordDto, token);
    return { message: 'ok' };
  }
}
