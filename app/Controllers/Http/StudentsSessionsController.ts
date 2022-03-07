import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StudentsSessionsController {
    public async store({ request, response, auth }: HttpContextContract) {
        const { email, password } = request.only(['email', 'password']);
        const token = await auth.use('api_students').attempt(email, password, {
            expiresIn: '2hours',
        });
        return response.ok({ student: auth.student, token });
    }

    public async destroy({ request, response, auth }: HttpContextContract) {
        auth.use('api_students').logout();
        return response.ok({});
    }
}
