import { SendOtpOptions } from './email-sender.model.js';

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

export function renderOtpEmail(options: SendOtpOptions): RenderedEmail {
  const purposeTitle =
    options.purpose === 'register' ? 'Account Registration' : 'Password Recovery';

  const subject = `[Studitopia] Your Verification Code: ${options.otp}`;

  const greeting = options.displayname ? `Hello ${options.displayname},` : 'Hello,';

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 560px; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); overflow: hidden; padding: 32px;" cellspacing="0" cellpadding="0">
          <tr>
            <td>
              <h1 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 700; color: #0f172a; text-align: center;">Studitopia</h1>
              <p style="margin: 0 0 8px 0; font-size: 16px; color: #334155;">${greeting}</p>
              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.5; color: #475569;">
                You requested a verification code for <strong>${purposeTitle}</strong>. Please use the following code to continue:
              </p>

              <div style="background-color: #f1f5f9; border: 2px dashed #cbd5e1; border-radius: 8px; padding: 20px; text-align: center; margin: 24px 0;">
                <span style="font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #1e293b;">
                  ${options.otp}
                </span>
              </div>

              <p style="margin: 0 0 12px 0; font-size: 14px; line-height: 1.5; color: #64748b; text-align: center;">
                ⏱️ This verification code will expire in <strong>5 minutes</strong>.
              </p>
              <p style="margin: 0 0 24px 0; font-size: 13px; line-height: 1.4; color: #94a3b8; text-align: center;">
                If you did not request this code, you can safely ignore this email. Never share your verification code with anyone.
              </p>

              <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 24px 0;" />
              <p style="margin: 0; font-size: 12px; color: #94a3b8; text-align: center;">
                &copy; ${new Date().getFullYear()} Studitopia Platform. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = `[Studitopia] Verification Code

${greeting}

Your verification code for ${purposeTitle} is: ${options.otp}

This code will expire in 5 minutes.
If you did not request this verification code, please ignore this email. Never share this code with anyone.

---
Studitopia Platform`;

  return { subject, html, text };
}
