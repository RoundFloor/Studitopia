import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";
import { RESPONSE_CODE } from "../../../common/response-code/code.config.js";

export function IsPassword(property?: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsPassword',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(password: string | undefined, args: ValidationArguments) {
          if (password === undefined) return false;
            if (password.length < 8 || password.length > 32) return false;
            let lowercase = false, supercase = false, number = false, special = false;
            for (let i = 0; i < password.length; i++) {
                if (password[i] >= 'a' && password[i] <= 'z') lowercase = true
                else if (password[i] >= 'A' && password[i] <= 'Z') supercase = true
                else if (password[i] >= '0' && password[i] <= '9') number = true
                else if ( password[i] == '\0') return false
                else special = true;
            }
            return lowercase && supercase && number && special;
        },
        defaultMessage(args: ValidationArguments) {
          return RESPONSE_CODE.INVALID_PASSWORD.toString();
        },
      },
    });
  };
}
