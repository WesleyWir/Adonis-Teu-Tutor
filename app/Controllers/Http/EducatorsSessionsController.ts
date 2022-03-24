import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequestException from 'App/Exceptions/BadRequestException';
import SessionsStoreValidator from 'App/Validators/SessionsStoreValidator';

export default class EducatorsSessionsController {
    async store({ request, response, auth }: HttpContextContract) {
        const { email, password } = await request.validate(SessionsStoreValidator);

        try {
            const token = await auth.use('api_educators').attempt(email, password, {
                expiresIn: '48hours',
            });

            return response.ok({ educator: auth.educator, token });
        } catch {
            throw new BadRequestException('Invalid credentials');
        }
    }

    async destroy({ response, auth }: HttpContextContract) {
        auth.use('api_educators').logout();
        return response.ok({});
    }
}
