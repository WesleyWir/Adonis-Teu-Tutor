import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BadRequestException extends Exception {
    public code: string = 'BAD_REQUEST';

    constructor(message: string) {
      super(message, 400)
    }
  
    public async handle(error: this, { response }: HttpContextContract) {
      response.status(error.status).send({ code: this.code, message: error.message, status: error.status })
    }
}
