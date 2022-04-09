import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from '../BaseValidator'
import { PixKeyType } from 'Contracts/enums'

export default class StorePixValidator extends BaseValidator{
  constructor(protected ctx: HttpContextContract) {
    super(ctx)
  }

  public schema = schema.create({
    keyType: schema.enum(Object.values(PixKeyType), [rules.required()]),
    value: schema.string({trim: true}, [rules.required()])
  })
}
