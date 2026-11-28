import { Injectable } from '@nestjs/common';

@Injectable()
export class ReCaptchaService {
  async validate(_token: string): Promise<boolean> {
    return true;
  }
}
