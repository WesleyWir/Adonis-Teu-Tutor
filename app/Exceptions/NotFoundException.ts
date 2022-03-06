import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class NotFoundException extends Exception {
    public code: string = 'E_NOTFOUND_EXCEPTION';

    constructor (message: string) {
        super(message, 404)
      }
    
      public async handle (error: this, {response}: HttpContextContract) {
        response.status(error.status).send({ code: this.code, message: error.message, status: error.status })
      }
}
