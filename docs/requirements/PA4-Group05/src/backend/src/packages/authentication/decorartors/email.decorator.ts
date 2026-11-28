import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";
import { RESPONSE_CODE } from "../../../common/response-code/code.config.js";

export function IsMyEmail(property?: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsMyEmail',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(email: string | undefined, args: ValidationArguments) {
          if (email === undefined) return false;
          if (email.length > 254) return false;
          const emailRegex = /^[a-zA-Z][a-zA-Z0-9]*([._-][a-zA-Z0-9]+)*([%+][a-zA-Z0-9]+)?@([a-zA-Z0-9]+[-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
          
          if (!emailRegex.test(email)) return false;
          return true;
        },
        defaultMessage(args: ValidationArguments) {
          return RESPONSE_CODE.INVALID_EMAIL.toString();
        },
      },
    });
  };
}
