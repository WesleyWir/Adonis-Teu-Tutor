import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from '../BaseValidator'
import { ClassCalendarStatus } from 'Contracts/enums'

export default class StudentStoreValidator extends BaseValidator{
  constructor(protected ctx: HttpContextContract) {
    super(ctx)
  }
  public schema = schema.create({
    educator_id: schema.string({}, [rules.required()]),
    educator_contact_means_id: schema.number([rules.required()]),
    notes: schema.string.optional(),
    class_calendars: schema.array([rules.required()]).members(
      schema.object().members({
        status: schema.enum.optional(Object.values(ClassCalendarStatus), []),
        note: schema.string.optional(),        
      })
    )
  })
}
