import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { validateAndFormatRut } from '../../utils/rut/rut.util';

@ValidatorConstraint({ async: false })
export class RutValidator implements ValidatorConstraintInterface {

  validate(rut: string) {
    const formattedRut = validateAndFormatRut(rut);
    return formattedRut !== false;
  }
}

export function IsRut(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: RutValidator,
    });
  };
}