import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from 'App/Validators/BaseValidator'

export default class StoreStudentPostValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) { super()}

  public schema = schema.create({
    title: schema.string({}, [rules.required()]),
    content: schema.string({}, [rules.required()]),
    subject: schema.string.optional()
  })
}
