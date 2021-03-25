import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class EmailService {
  private configService: ConfigService;
  private transporter: Mail;

  constructor(configService: ConfigService) {
    this.configService = configService;
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.configService.get<string>('SMTP_USERNAME'), // generated ethereal user
        pass: this.configService.get<string>('SMTP_PASSWORD'), // generated ethereal password
      },
    });
  }

  async sendMail(
    emailObj: Omit<nodemailer.SendMailOptions, 'from'>,
  ): Promise<void> {
    // Only needed if you don't have a real mail account for testing
    // create reusable transporter object using the default SMTP transport
    // send mail with defined transport object
    const data = await this.transporter.sendMail({
      from: this.configService.get('SMTP_USERNAME'),
      ...emailObj,
    });
    console.log(data);
  }
}
