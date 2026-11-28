export interface SendOtpOptions {
  to: string;
  otp: string;
  purpose: 'register' | 'recover_password';
  displayname?: string;
}

export interface EmailSendResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export class EmailSenderException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EmailSenderException';
  }
}

export class EmailConfigurationException extends EmailSenderException {
  constructor(message = 'Email service is improperly configured.') {
    super(message);
    this.name = 'EmailConfigurationException';
  }
}

export class InvalidRecipientException extends EmailSenderException {
  constructor(message = 'Invalid recipient email address.') {
    super(message);
    this.name = 'InvalidRecipientException';
  }
}

export class EmailTransportException extends EmailSenderException {
  constructor(message = 'Failed to transmit email through Resend API.') {
    super(message);
    this.name = 'EmailTransportException';
  }
}

export class EmailRateLimitException extends EmailSenderException {
  constructor(message = 'Email sending rate limit exceeded.') {
    super(message);
    this.name = 'EmailRateLimitException';
  }
}
