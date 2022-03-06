import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from './BaseValidator'

export default class CreateStudentValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super();
  }

  public schema = schema.create({
    name: schema.string({}, [rules.required()]),
    cpf: schema.string({}, [rules.required(), rules.cpf(), rules.unique({ table: 'students', column: 'cpf'})]),
    birthdate: schema.date({}, [rules.required()]),
    email: schema.string({}, [rules.required(), rules.email(), rules.unique({ table: 'students', column: 'email'})]),
    password: schema.string({}, [rules.required(), rules.minLength(8)]),
  });
}