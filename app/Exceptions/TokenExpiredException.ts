import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class TokenExpiredException extends Exception {
    public code = 'TOKEN_EXPIRED';
    public status = 410;

    constructor(){
        super('Token has expired');
    }

    public async handle(error: this, { response }: HttpContextContract){
        return response.status(error.status).send({ code: error.code, message: this.message, status: error.status });
    }
}
