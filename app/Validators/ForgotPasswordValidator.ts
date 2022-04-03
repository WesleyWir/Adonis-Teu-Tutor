import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from './BaseValidator';

export default class ForgotPasswordValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx);
  }

  public schema = schema.create({
    email: schema.string({}, [rules.required(), rules.email()]),
  })
}
