import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'isNotBlank', async: false })
class IsNotBlankConstraint implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return (
      text !== '' &&
      text !== null &&
      text !== undefined &&
      text.trim().length > 0
    );
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} should not be empty`;
  }
}

export function IsNotBlank(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isNotBlank',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsNotBlankConstraint,
    });
  };
}
