import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from '../BaseValidator'
import { ClassCalendarStatus, ClassTypes } from 'Contracts/enums'

export default class StudentStoreValidator extends BaseValidator{
  constructor(protected ctx: HttpContextContract) {
    super(ctx)
  }
  public schema = schema.create({
    educator_id: schema.string({}, [rules.required()]),
    educator_contact_means_id: schema.number.optional(),
    note: schema.string.optional(),
    class_calendars: schema.array([rules.required()]).members(
      schema.object().members({
        educator_calendar_id:  schema.number([rules.required()]),
        status: schema.enum.optional(Object.values(ClassCalendarStatus), []),
        type: schema.enum.optional(Object.values(ClassTypes), []),
        note: schema.string.optional(),        
      })
    )
  })
}
