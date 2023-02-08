import { Controller, Body } from '@nestjs/common';
import { SendgridService } from './services';
import { EventPattern } from '@nestjs/microservices';
import { SendConfirmationEmailEvent, SendResetPasswordEmailEvent } from './events';

@Controller()
export class AppController {

  constructor(private readonly sendgridService: SendgridService) { }

  @EventPattern('send_confirmation_email')
  async sendEmail(sendConfirmationEmailEvent: SendConfirmationEmailEvent) {
    await this.sendgridService.sendConfirmationEmail(
      sendConfirmationEmailEvent.email,
      sendConfirmationEmailEvent.token
    );
  }

  @EventPattern('send_reset_password_email')
  async sendResetPasswordEmail(sendResetPasswordEmailEvent: SendResetPasswordEmailEvent) {
    await this.sendgridService.sendResetPasswordEmail(
      sendResetPasswordEmailEvent.email,
      sendResetPasswordEmailEvent.token
    );
  }
}
