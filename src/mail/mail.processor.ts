import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailDataType } from './types';

@Processor('mail-queue')
export class MailProcessor {
  constructor(private mailerService: MailerService) {}

  @Process('mail-sending')
  handleSendMail(job: Job<MailDataType>) {
    try {
      this.mailerService.sendMail({
        to: job.data.toEmail,
        from: '"Support Team" <support@vaccineportal.com>',
        subject: 'Reset password request',
        template: './forgot-password',
        context: { url: job.data.url },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
