import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { RESPONSE_CODE } from '../../../common/response-code/code.config.js';

export function IsDisplayname(property?: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsDisplayname',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(display: string | undefined, args: ValidationArguments) {
          if (display === undefined) return false;
            if (display.length < 8 || display.length > 32) return false;
            const regex = /^[a-zA-Z0-9]+([ ][a-zA-Z0-9]+)*$/
            if (!regex.test(display)) return false;
            return true;
          },
          defaultMessage(args: ValidationArguments) {
          return RESPONSE_CODE.INVALID_DISPLAYNAME.toString();
        },
      },
    });
  };
}
