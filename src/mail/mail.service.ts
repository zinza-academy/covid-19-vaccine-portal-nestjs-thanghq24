import { ConfigService } from '@nestjs/config';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { MailDataType } from './types';

@Injectable()
export class MailService {
  constructor(
    private configService: ConfigService,
    @InjectQueue('mail-queue') private mailQueue: Queue<MailDataType>,
  ) {}

  async sendForgotPasswordEmail(toEmail: string, token: string) {
    try {
      const url = `${this.configService.get(
        'CORS_ORIGIN',
      )}/reset-password/${token}`;

      this.mailQueue.add('mail-sending', {
        toEmail: toEmail,
        url: url,
      });
    } catch (error) {
      throw new InternalServerErrorException({
        error: error,
      });
    }
  }
}
