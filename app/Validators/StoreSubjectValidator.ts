import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from './BaseValidator';

export default class StoreSubjectValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super();
  }

  public schema = schema.create({
    subject: schema.string({}, [rules.required(), rules.unique({ table: 'subjects', column: 'subject'})]),
  })  
}
