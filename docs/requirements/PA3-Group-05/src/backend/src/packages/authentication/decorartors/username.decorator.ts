import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";
import { RESPONSE_CODE } from "../../../common/response-code/code.config.js";

export function IsUsername(property?: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsUsername',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(username: string | undefined, args: ValidationArguments) {
          if (username === undefined) return false;
          if (username.length < 8 || username.length > 32) return false;
          const regex = /^[a-z][a-z0-9]*([.][a-z0-9]+)*$/
          if (!regex.test(username)) return false;
          return true;
        },
        defaultMessage(args: ValidationArguments) {
          return RESPONSE_CODE.INVALID_USERNAME.toString();
        },
      },
    });
  };
}
