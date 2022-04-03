import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BaseValidator {
    constructor(protected ctx: HttpContextContract) {
    }

    public messages = this.ctx.i18n.validatorMessages('validator.shared')
}