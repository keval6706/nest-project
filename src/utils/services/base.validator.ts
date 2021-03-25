import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import {
  ArgumentMetadata,
  HttpStatus,
  Injectable,
  PipeTransform,
  Type,
  UnprocessableEntityException,
} from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const meta = errors.reduce((list, err) => {
        if (err.constraints) {
          list[err.property] = Object.values(err.constraints).pop();
        }
        if (err.children.length) {
          list[err.property] = this.childError(err.children);
        }
        return list;
      }, {});
      throw new UnprocessableEntityException({
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Validation Errors.',
        errors: meta,
      });
    }
    return value;
  }

  private toValidate(metatype: Type<any>): boolean {
    const types: Array<Type<any>> = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private childError(errors): any {
    return errors.reduce((list, err) => {
      if (err.constraints) {
        list[err.property] = Object.values(err.constraints).pop();
      }
      if (err.children.length) {
        list[err.property] = this.childError(err.children);
      }
      return list;
    }, {});
  }
}
