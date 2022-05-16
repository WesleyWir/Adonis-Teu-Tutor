import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from 'App/Validators/BaseValidator';

export default class CreateEducatorAddressValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx);
  }

  public schema = schema.create({
    country: schema.string({}, [rules.required()]),
    state: schema.string({}, [rules.required()]),
    city: schema.string({}, [rules.required()]),
    neighborhood: schema.string({}, [rules.required()]),
  })
}
