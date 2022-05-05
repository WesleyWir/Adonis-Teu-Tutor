import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from 'App/Validators/BaseValidator'

export default class CreateStudentValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx);
  }

  public schema = schema.create({
    name: schema.string({}, [rules.required()]),
    birthdate: schema.date({format: 'dd/MM/yyyy'}, [rules.required(), rules.before('today')]),
    email: schema.string({trim: true}, [rules.required(), rules.email(), rules.unique({ table: 'students', column: 'email'})]),
    password: schema.string({trim: true}, [rules.required(), rules.minLength(8)]),
  });
}
