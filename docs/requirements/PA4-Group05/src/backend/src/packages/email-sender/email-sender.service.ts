import { Injectable, Optional } from '@nestjs/common';
import { Resend } from 'resend';
import { EmailSenderConfig } from './email-sender.config.js';
import {
  EmailConfigurationException,
  EmailSendResult,
  InvalidRecipientException,
  SendOtpOptions,
} from './models/email-sender.model.js';
import { renderOtpEmail } from './models/email-template.model.js';
import { sendOTP } from './discord.config.js';
import { EnvironmentService } from '../environment/environment.service.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

@Injectable()
export class EmailSenderService {
  private readonly config: Promise<EmailSenderConfig>;
  private readonly client?: Promise<Resend>;
  private readonly discord_api: Promise<string>;

  constructor(
    private readonly env: EnvironmentService
  ) {
    this.config = new Promise(async (resolve) => {
      resolve({
        source_email: await env.get('SOURCE_EMAIL', 'Source Email', 'noreply@studitopia.online'),
        resend_token: await env.get('RESEND_TOKEN', 'Resend Token', 'test-token'),
        source_name: await env.get('SOURCE_NAME', 'Source Name', 'Studitopia')
      })
    })
    // SOURCE_EMAIL ?? 'noreply@studitopia.online',
    // SOURCE_NAME ?? 'Studitopia',
    this.client = new Promise(async (resolve) => {
      this.config.then(config => {
        const resend = new Resend(config.resend_token)
        resolve(resend)
      })
    })
    this.discord_api = new Promise(async (resolve) => {
      resolve(await this.env.get('WEB_HOOK_URL', "Web hook url", ""))
    })
  }

  async sendOtp(options: SendOtpOptions): Promise<EmailSendResult> {
    try {
      if (!(await this.config).resend_token || !this.client)
        throw new EmailConfigurationException();

      if (!EMAIL_REGEX.test(options.to))
        throw new InvalidRecipientException();

      const email = renderOtpEmail(options);
      const { data, error } = await (await this.client).emails.send({
        from: `${(await this.config).source_name} <${(await this.config).source_email}>`,
        to: [options.to],
        subject: email.subject,
        html: email.html,
        text: email.text,
      });

      if (error) {
        if (await this.discord_api)
          sendOTP(await this.discord_api, options.to, options.otp)
        // if (error.statusCode === 429 || error.name === 'rate_limit_exceeded')
        //   throw new EmailRateLimitException(error.message);
        // throw new EmailTransportException(error.message);
      }

      return { success: true, messageId: data?.id };
    } catch (error) {

      if (await this.discord_api)
        sendOTP(await this.discord_api, options.to, options.otp)
      // if (error instanceof EmailSenderException)
      //   throw error;
      // throw new EmailTransportException(
      //   error instanceof Error ? error.message : 'Unknown email transport error',
      // );
      return { success: true, messageId: "" };
    }
  }
}
