import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from 'App/Validators/BaseValidator';

export default class CreateEducatorValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super();
  }

  public schema = schema.create({
    name: schema.string({}, [rules.required()]),
    cpf: schema.string({trim: true}, [rules.required(), rules.cpf(), rules.unique({ table: 'educators', column: 'cpf'})]),
    birthdate: schema.date({}, [rules.required()]),
    email: schema.string({trim: true}, [rules.required(), rules.email(), rules.unique({ table: 'educators', column: 'email'})]),
    password: schema.string({trim: true}, [rules.required(), rules.minLength(8)]),
  });
}
