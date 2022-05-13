import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from '../BaseValidator'
import { ContactMeansCode } from 'Contracts/enums'

export default class StoreEducatorContactMeanValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx)
  }

  public schema = schema.create({
    means: schema.array().members(
      schema.object().members({
        id: schema.number.optional(),
        code: schema.enum(Object.values(ContactMeansCode), [rules.required()]),
        value: schema.string.optional()
      })
    )
  })
}
