import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from '../BaseValidator';

export default class StoreEducatorClassTypeValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super();
  }

  public schema = schema.create({
    type: schema.string({}, [rules.required()]),
  })
}
