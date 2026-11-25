import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EmailSenderService } from '../email-sender.service.js';
import {
  EmailConfigurationException,
  InvalidRecipientException,
  EmailRateLimitException,
  EmailTransportException,
} from '../models/email-sender.model.js';

describe('EmailSenderService', () => {
  let service: EmailSenderService;
  let mockResendSend: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockResendSend = vi.fn().mockResolvedValue({
      data: { id: 'msg_12345' },
      error: null,
    });

    const mockResendClient = {
      emails: {
        send: mockResendSend,
      },
    };

    service = new EmailSenderService(
      {
        resend_token: 're_test_123456789',
        source_email: 'noreply@studitopia.online',
        source_name: 'Studitopia',
      },
      mockResendClient as any,
    );
  });

  it('should successfully dispatch a styled OTP email', async () => {
    const result = await service.sendOtp({
      to: 'user@example.com',
      otp: '123456',
      purpose: 'register',
      displayname: 'Alex',
    });

    expect(result.success).toBe(true);
    expect(result.messageId).toBe('msg_12345');
    expect(mockResendSend).toHaveBeenCalledTimes(1);

    const callArgs = mockResendSend.mock.calls[0][0];
    expect(callArgs.from).toBe('Studitopia <noreply@studitopia.online>');
    expect(callArgs.to).toEqual(['user@example.com']);
    expect(callArgs.subject).toBe('[Studitopia] Your Verification Code: 123456');
    expect(callArgs.html).toContain('123456');
    expect(callArgs.html).toContain('letter-spacing: 8px');
    expect(callArgs.text).toContain('123456');
    expect(callArgs.text).toContain('Account Registration');
  });

  it('should throw EmailConfigurationException if resend_token is missing or empty', async () => {
    const unconfiguredService = new EmailSenderService({
      resend_token: '',
      source_email: 'noreply@studitopia.online',
      source_name: 'Studitopia',
    });

    await expect(
      unconfiguredService.sendOtp({
        to: 'user@example.com',
        otp: '123456',
        purpose: 'register',
      }),
    ).rejects.toThrow(EmailConfigurationException);
  });

  it('should throw InvalidRecipientException if destination email format is invalid', async () => {
    await expect(
      service.sendOtp({
        to: 'invalid-email-address',
        otp: '123456',
        purpose: 'register',
      }),
    ).rejects.toThrow(InvalidRecipientException);

    expect(mockResendSend).not.toHaveBeenCalled();
  });

  it('should throw EmailRateLimitException when Resend returns 429 / rate_limit_exceeded', async () => {
    mockResendSend.mockResolvedValueOnce({
      data: null,
      error: {
        name: 'rate_limit_exceeded',
        message: 'Too many requests. Please slow down.',
        statusCode: 429,
      },
    });

    await expect(
      service.sendOtp({
        to: 'user@example.com',
        otp: '654321',
        purpose: 'recover_password',
      }),
    ).rejects.toThrow(EmailRateLimitException);
  });

  it('should throw EmailTransportException when Resend returns an authentication or API error', async () => {
    mockResendSend.mockResolvedValueOnce({
      data: null,
      error: {
        name: 'invalid_api_key',
        message: 'The API key provided is invalid.',
        statusCode: 401,
      },
    });

    await expect(
      service.sendOtp({
        to: 'user@example.com',
        otp: '654321',
        purpose: 'recover_password',
      }),
    ).rejects.toThrow(EmailTransportException);
  });

  it('should throw EmailTransportException when network communication throws', async () => {
    mockResendSend.mockRejectedValueOnce(new Error('Network connection timeout'));

    await expect(
      service.sendOtp({
        to: 'user@example.com',
        otp: '654321',
        purpose: 'recover_password',
      }),
    ).rejects.toThrow(EmailTransportException);
  });
});
