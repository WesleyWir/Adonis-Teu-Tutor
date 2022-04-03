import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from '../BaseValidator'

export default class StoreEducatorContactMeanValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    title: schema.string({}, [rules.required()]),
    description: schema.string.optional()
  })
}
