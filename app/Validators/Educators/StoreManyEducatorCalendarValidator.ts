import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from '../BaseValidator'

export default class StoreManyEducatorCalendarValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx)
  }

  public schema = schema.create({
    dates: schema.array().members(
      schema.object().members({
        date: schema.date({ format: 'sql' }, [rules.required()]),
        start_time: schema.string({ trim: true }, [rules.required(), rules.regex(/^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/)]),
        end_time: schema.string({ trim: true }, [rules.required(), rules.regex(/^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/)]),
        price: schema.number([rules.required()]),
      })
    )
  })
}
