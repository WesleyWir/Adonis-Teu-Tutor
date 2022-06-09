import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from '../BaseValidator'
import { PossibleEducatorRate } from 'Contracts/enums'

export default class StoreRatingValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx)
  }

  public schema = schema.create({
    rate: schema.enum(Object.values(PossibleEducatorRate), [rules.required()]),
    comment: schema.string.optional()
  })
}
