import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from 'App/Validators/BaseValidator'

export default class UpdateStudentPostValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) { super(ctx)}

  public schema = schema.create({
    title: schema.string.optional(),
    content: schema.string.optional(),
    subject: schema.string.optional()
  })
}
