import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequestException from 'App/Exceptions/BadRequestException';
import SessionsStoreValidator from 'App/Validators/SessionsStoreValidator';

export default class EducatorsSessionsController {
    async store({ request, response, auth, i18n }: HttpContextContract) {
        const { email, password } = await request.validate(SessionsStoreValidator);

        try {
            const token = await auth.use('api_educators').attempt(email, password, {
                expiresIn: '48hours',
            });

            return response.ok({ educator: auth.user, token });
        } catch {
            throw new BadRequestException(i18n.formatMessage('messages.invalid_credentials'));
        }
    }

    async destroy({ response, auth }: HttpContextContract) {
        auth.use('api_educators').logout();
        return response.ok({});
    }
}
