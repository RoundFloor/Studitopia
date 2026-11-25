import { IsDisplayname } from "../decorartors/displayname.decorator.js";
import { IsUsername } from "../decorartors/username.decorator.js";
import { IsPassword } from "../decorartors/password.decorator.js";
import { IsMyEmail } from "../decorartors/email.decorator.js";

export class RegisterDto {
  @IsDisplayname()
  readonly displayname: string;
  
  @IsUsername()
  readonly username: string;

  @IsMyEmail()
  readonly email: string;
  
  @IsPassword()
  readonly password: string;
}