import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from 'App/Validators/BaseValidator'

export default class IndexStudentPostValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx);
  }

  public schema = schema.create({
    orderBy: schema.string.optional(),
    order: schema.string.optional(),
    search: schema.string.optional(),
    limit: schema.number.optional(),
    page: schema.number.optional(),
    subject: schema.number.optional(),
  })
}
