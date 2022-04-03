import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from 'App/Validators/BaseValidator';

export default class UpdateOptionToolValidator extends BaseValidator{
  constructor(protected ctx: HttpContextContract) {
    super(ctx);
  }

  public schema = schema.create({
    // TODO: change this conform the file upload.
    icon: schema.string.optional(),
    tool: schema.string({}, [rules.required()]),
  })
}
