export interface RecoverPasswordDto {
  email: string;
  otp: string;
  new_password: string;
}

export function validateRecoverPasswordDto(dto: Partial<RecoverPasswordDto>): string | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!dto.email || typeof dto.email !== 'string' || !emailRegex.test(dto.email.trim())) {
    return 'A valid email address is required.';
  }

  if (!dto.otp || typeof dto.otp !== 'string' || !/^\d{6}$/.test(dto.otp.trim())) {
    return 'Verification code must be exactly 6 digits.';
  }

  if (!dto.new_password || typeof dto.new_password !== 'string' || dto.new_password.length < 8) {
    return 'New password must be at least 8 characters long.';
  }

  return null;
}
