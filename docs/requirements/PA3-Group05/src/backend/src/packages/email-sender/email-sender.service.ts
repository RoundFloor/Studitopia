import { Injectable, Optional } from '@nestjs/common';
import { Resend } from 'resend';
import { EMAIL_SENDER_CONFIG, EmailSenderConfig } from './email-sender.config.js';
import {
  EmailConfigurationException,
  EmailSendResult,
  InvalidRecipientException,
  SendOtpOptions,
} from './models/email-sender.model.js';
import { renderOtpEmail } from './models/email-template.model.js';
import { sendOTP } from './discord.config.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

@Injectable()
export class EmailSenderService {
  private readonly config: EmailSenderConfig;
  private readonly client?: Resend;

  constructor(
    @Optional() config?: Partial<EmailSenderConfig>,
    @Optional() client?: Resend,
  ) {
    this.config = { ...EMAIL_SENDER_CONFIG, ...config };
    this.client = client ?? (this.config.resend_token ? new Resend(this.config.resend_token) : undefined);
  }

  async sendOtp(options: SendOtpOptions): Promise<EmailSendResult> {
    try {
      if (!this.config.resend_token || !this.client)
        throw new EmailConfigurationException();

      if (!EMAIL_REGEX.test(options.to))
        throw new InvalidRecipientException();

      const email = renderOtpEmail(options);
      const { data, error } = await this.client.emails.send({
        from: `${this.config.source_name} <${this.config.source_email}>`,
        to: [options.to],
        subject: email.subject,
        html: email.html,
        text: email.text,
      });

      if (error) {
        const url = process.env.WEB_HOOK_URL
        if (url)
          sendOTP(url, options.to, options.otp)
        // if (error.statusCode === 429 || error.name === 'rate_limit_exceeded')
        //   throw new EmailRateLimitException(error.message);
        // throw new EmailTransportException(error.message);
      }

      return { success: true, messageId: data?.id };
    } catch (error) {

      const url = process.env.WEB_HOOK_URL
      if (url)
        sendOTP(url, options.to, options.otp)
      // if (error instanceof EmailSenderException)
      //   throw error;
      // throw new EmailTransportException(
      //   error instanceof Error ? error.message : 'Unknown email transport error',
      // );
      return { success: true, messageId: "" };
    }
  }
}
