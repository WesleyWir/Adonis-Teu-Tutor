import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mail from '@ioc:Adonis/Addons/Mail'
import { randomBytes } from 'crypto';
import { promisify } from 'util'
import Student from 'App/Models/Student';

export default class PasswordsController {

    public async forgotPassword({request }: HttpContextContract){
        const { email } = request.only(['email', 'type']);
        const student = await Student.findByOrFail('email', email)

        const random = await promisify(randomBytes)(24);
        const token = random.toString('hex');
        await student.related('tokens').updateOrCreate(
            { studentId: student.id },
            {
                token,
            });

        await Mail.send((message) => {
            let data = {
                front_url: 'front url from env...',
                type: '',
                token: 'rkginorngo' 
            };
            message.from('no-reply@teututor.com')
                    .to(email)
                    .subject('TeuTutor: Recuperação de senha.')
                    .htmlView('emails/forgotpassword', data);
        })
    }
}
