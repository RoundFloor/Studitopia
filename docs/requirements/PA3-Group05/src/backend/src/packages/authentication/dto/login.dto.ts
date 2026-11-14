export class LoginDto {
  identifier: string;
  password: string;
  type: 'email' | 'username';
}