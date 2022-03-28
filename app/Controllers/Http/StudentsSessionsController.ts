import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequestException from 'App/Exceptions/BadRequestException';
import SessionsStoreValidator from 'App/Validators/SessionsStoreValidator';

export default class StudentsSessionsController {
    public async store({ request, response, auth }: HttpContextContract) {
        const { email, password } = await request.validate(SessionsStoreValidator);

        try {
            const token = await auth.use('api_students').attempt(email, password, {
                expiresIn: '48hours',
            });
            return response.ok({ student: auth.user, token });
        } catch {
            throw new BadRequestException('Invalid credentials');
        }
    }

    public async destroy({ response, auth }: HttpContextContract) {
        auth.use('api_students').logout();
        return response.ok({});
    }
}
