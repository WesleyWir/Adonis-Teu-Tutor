import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequestException from 'App/Exceptions/BadRequestException';
import SessionsStoreValidator from 'App/Validators/SessionsStoreValidator';

export default class StudentsSessionsController {
    public async store({ request, response, auth, i18n }: HttpContextContract) {
        const { email, password } = await request.validate(SessionsStoreValidator);

        try {
            const authenticated = await auth.use('api_students').attempt(email, password, {
                expiresIn: '48hours',
            });
            const { token } = authenticated;
            return response.ok(token);
        } catch {
            throw new BadRequestException(i18n.formatMessage('messages.invalid_credentials'));
        }
    }

    public async show({ auth }: HttpContextContract) {
        return { student: auth.user };
    }

    public async destroy({ response, auth }: HttpContextContract) {
        auth.use('api_students').logout();
        return response.ok({});
    }
}
