import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthorizationException extends Exception {
  public code: string = 'E_AUTHORIZATION_EXCEPTION';
  public redirectTo: string;

  constructor(message: string, redirectTo?: string) {
    super(message, 401);
    this.redirectTo = redirectTo ?? '';
  }

  public async handle(error: this, { response }: HttpContextContract) {
    response.status(error.status).send({ code: error.code, message: this.message, status: error.status, redirectTo: this.redirectTo })
  }
}
