import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthorizationException extends Exception {
  public code: string = 'E_AUTHORIZATION_EXCEPTION';

  constructor(message: string) {
    super(message, 401)
  }

  public async handle(error: this, { response }: HttpContextContract) {
    response.status(error.status).send({ code: error.code, message: this.message, status: error.status })
  }
}
