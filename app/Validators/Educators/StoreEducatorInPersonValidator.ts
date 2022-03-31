import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { InPersonTypes } from 'Contracts/enums';
import BaseValidator from '../BaseValidator';

export default class StoreEducatorInPersonValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super();
  }

  public schema = schema.create({
    type: schema.enum(Object.values(InPersonTypes), [rules.required()]),
  })
}
