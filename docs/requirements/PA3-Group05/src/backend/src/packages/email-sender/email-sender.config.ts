export const EMAIL_SENDER_URL = process.env.EMAIL_SENDER_URL ?? '';

export const EMAIL_SENDER_CONFIG = {
  resend_token: process.env.RESEND_TOKEN ?? '',
  source_email: process.env.SOURCE_EMAIL ?? 'noreply@studitopia.online',
  source_name: process.env.SOURCE_NAME ?? 'Studitopia',
} as const;

export type EmailSenderConfig = {
  resend_token: string;
  source_email: string;
  source_name: string;
};
