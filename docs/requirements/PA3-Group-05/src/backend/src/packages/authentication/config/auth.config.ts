export const AUTH_CONFIG = {
  otp_expires_in_ms: 5 * 60 * 1000, // 5 minutes
  otp_cooldown_ms: 60 * 1000, // 60 seconds
  otp_expires_in_seconds: 300,
  otp_cooldown_seconds: 60,
  default_token_expires_ms: 15 * 60 * 1000, // 15 minutes
} as const;
