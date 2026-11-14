import { EmailSenderService } from '../email-sender.service.js';
import { EmailSendResult, SendOtpOptions } from '../models/email-sender.model.js';

export const EmailSenderServiceMock = {
  sendOtp: vi.fn(async (_options: SendOtpOptions): Promise<EmailSendResult> => ({
    success: true,
    messageId: 'mock-message-id',
  })),
} as any as EmailSenderService;
