import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class SendgridService {

  private readonly logger = new Logger(SendgridService.name);

  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get<string>('MAIL_SERVER_KEY'));
  }

  async sendConfirmationEmail(email: string, token: string): Promise<[SendGrid.ClientResponse, {}]> {
    const mail: SendGrid.MailDataRequired = {
      // to: email,
      to: 'marcelsauter9299@gmail.com',
      subject: 'Hello from sendgrid',
      from: this.configService.get('FROM_MAIL'),
      text: 'Hello, first email send!',
      // html: `<h1>CONFIRM REGISTERATION: ${token}</h1>`
      html: `
        <a href="${this.configService.get('UI_URL') + '/confirm-registration?emailToken=' + token}">
          <button>Registrierung bestätigen</button>
        </a>
      `
    };

    try {
      const transport = await SendGrid.send(mail);
      this.logger.log(`Confirm registration email sent to ${mail.to}`);

      return transport;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async sendResetPasswordEmail(email: string, token: string): Promise<[SendGrid.ClientResponse, {}]> {
    const mail: SendGrid.MailDataRequired = {
      // to: email,
      to: 'marcelsauter9299@gmail.com',
      subject: 'Hello from sendgrid',
      from: this.configService.get('FROM_MAIL'),
      text: 'Hello, first email send!',
      // html: `<h1>RESET PASSWORD: ${token}</h1>`
      html: `
        <a href="${this.configService.get('UI_URL') + '/reset-password?emailToken=' + token}">
          <button>Passwort zurücksetzen</button>
        </a>`
    };

    try {
      const transport = await SendGrid.send(mail);
      this.logger.log(`Reset password email sent to ${mail.to}`);

      return transport;
    } catch (error) {
      this.logger.error(error);
    }
  }

}
