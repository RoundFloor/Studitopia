export interface LogoutDto {
  refresh_token: string;
}

export function validateLogoutDto(dto: Partial<LogoutDto>): string | null {
  if (!dto.refresh_token || typeof dto.refresh_token !== 'string' || dto.refresh_token.trim().length === 0) {
    return 'Refresh token is required.';
  }
  return null;
}
