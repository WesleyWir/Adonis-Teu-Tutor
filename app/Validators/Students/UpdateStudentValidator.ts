import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from 'App/Validators/BaseValidator'

export default class UpdateStudentValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx);
  }

  public schema = schema.create({
    name: schema.string.optional(),
    birthdate: schema.date.optional(),
    avatar: schema.string.optional(),
    password: schema.string.optional(),
  })
}
