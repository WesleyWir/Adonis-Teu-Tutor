import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from 'App/Validators/BaseValidator';
import { ClassTypes } from 'Contracts/enums';

export default class StoreEducatorClassTypeValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx);
  }

  public schema = schema.create({
    type: schema.enum(Object.values(ClassTypes), [rules.required()]),
  })
}
